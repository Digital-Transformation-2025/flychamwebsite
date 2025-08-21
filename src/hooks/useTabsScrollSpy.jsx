"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useTabsScrollSpy(tabs = [], options = {}) {
  const {
    headerSelector = "#sticky-head",
    offset: offsetProp = null,
    getSectionId = (t) => `section-${t.id}`,
    suppressMs = 400,
  } = options;

  const [active, setActive] = useState(tabs?.[0]?.id ?? 0);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  const programTargetRef = useRef(null);

  // sticky offset
  const [offsetPx, setOffsetPx] = useState(0);
  const measureOffset = useCallback(() => {
    if (offsetProp != null) { setOffsetPx(offsetProp); return; }
    const el = document.querySelector(headerSelector);
    if (!el) { setOffsetPx(0); return; }
    const pos = getComputedStyle(el).position;
    setOffsetPx(pos === "fixed" ? (el.offsetHeight || 160) : 0);
  }, [headerSelector, offsetProp]);

  useEffect(() => {
    measureOffset();
    const onR = () => measureOffset();
    window.addEventListener("resize", onR, { passive: true });
    window.addEventListener("orientationchange", onR, { passive: true });
    return () => {
      window.removeEventListener("resize", onR);
      window.removeEventListener("orientationchange", onR);
    };
  }, [measureOffset]);

  // keep active valid
  useEffect(() => {
    if (!tabs.some((t) => t.id === activeRef.current)) {
      setActive(tabs?.[0]?.id ?? 0);
    }
  }, [tabs]);

  const sectionIds = useMemo(() => tabs.map(getSectionId), [tabs, getSectionId]);

  const suppressUntilRef = useRef(0);

  const computeCurrent = useCallback(() => {
    if (!sectionIds.length) return;
    const off = offsetPx;

    const list = sectionIds.map((sid) => {
      const el = document.getElementById(sid);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { sid, top: r.top - off, bottom: r.bottom - off };
    }).filter(Boolean);
    if (!list.length) return;

    // 1) section crossing the line
    let ix = list.findIndex(s => s.top <= 1 && s.bottom > 1);

    // 2) else last passed, else first upcoming, else last
    if (ix === -1) {
      let lastPassed = -1;
      for (let i = 0; i < list.length; i++) if (list[i].top <= 1) lastPassed = i;
      if (lastPassed !== -1) ix = lastPassed;
      else {
        ix = list.findIndex(s => s.top >= 0);
        if (ix === -1) ix = list.length - 1;
      }
    }

    // 3) snap ahead if the next is close under the line
    const SNAP = Math.max(80, Math.floor(off / 4));
    if (ix + 1 < list.length) {
      const nxt = list[ix + 1];
      if (nxt.top >= 0 && nxt.top <= SNAP) ix = ix + 1;
    }

    // 4) bias toward clicked target if near the line
    if (programTargetRef.current) {
      const pti = list.findIndex(s => s.sid === programTargetRef.current);
      if (pti !== -1 && Math.abs(list[pti].top) <= SNAP) ix = pti;
    }

    const targetSid = list[ix].sid;
    const tab = tabs.find((t) => getSectionId(t) === targetSid);
    if (tab && tab.id !== activeRef.current) setActive(tab.id);
  }, [sectionIds, offsetPx, tabs, getSectionId]);

  // IO + scroll
  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds.map((sid) => document.getElementById(sid)).filter(Boolean);
    let raf = null;
    const onWake = () => {
      if (Date.now() < suppressUntilRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeCurrent);
    };

    let io = null;
    if (typeof IntersectionObserver !== "undefined" && elements.length) {
      io = new IntersectionObserver(onWake, {
        root: null,
        rootMargin: `-${Math.max(0, offsetPx)}px 0px -1px 0px`,
        threshold: [0, 1],
      });
      elements.forEach((el) => io.observe(el));
    }

    window.addEventListener("scroll", onWake, { passive: true });
    computeCurrent();

    return () => {
      window.removeEventListener("scroll", onWake);
      if (io) io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionIds.join("|"), offsetPx, computeCurrent]);

  // click → smooth scroll
  const onChangeTab = useCallback((tabOrIdOrIndex, index, tabsContainerRef, itemRefs) => {
    const tab =
      typeof tabOrIdOrIndex === "object" && tabOrIdOrIndex
        ? tabOrIdOrIndex
        : tabs.find((t, i) => String(t.id) === String(tabOrIdOrIndex) || i === tabOrIdOrIndex);
    if (!tab) return;

    setActive(tab.id);
    const sid = getSectionId(tab);
    programTargetRef.current = sid;

    const el = document.getElementById(sid);
    if (!el) return;

    const prev = el.style.scrollMarginTop;
    el.style.scrollMarginTop = `${Math.max(0, offsetPx)}px`;

    const muteFor = Math.max(600, suppressMs);
    suppressUntilRef.current = Date.now() + muteFor;

    el.scrollIntoView({ behavior: "smooth", block: "start" });

    setTimeout(() => {
      el.style.scrollMarginTop = prev;
      computeCurrent(); // final correction
      programTargetRef.current = null;
    }, muteFor + 50);

    // keep clicked tab visible (unchanged)
    const c = tabsContainerRef?.current;
    const it = itemRefs?.current?.[index];
    if (c && it) {
      const cr = c.getBoundingClientRect();
      const ir = it.getBoundingClientRect();
      if (ir.left < cr.left) {
        c.scrollTo({ left: c.scrollLeft - (cr.left - ir.left) - 20, behavior: "smooth" });
      } else if (ir.right > cr.right) {
        c.scrollTo({ left: c.scrollLeft + (ir.right - cr.right) + 20, behavior: "smooth" });
      }
    }
  }, [tabs, getSectionId, offsetPx, suppressMs, computeCurrent]);

  return { active, onChangeTab };
}
