"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export function useTabsScrollSpy(tabs = [], options = {}) {
  const {
    headerSelector = "#sticky-head",
    offset: offsetProp = null,          // force a fixed offset if provided
    getSectionId = (t) => `section-${t.id}`,
    suppressMs = 400,                   // mute spy briefly after programmatic scroll
  } = options;

  const [active, setActive] = useState(tabs?.[0]?.id ?? 0);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  // Measure sticky header (height when fixed; 0 when static) unless forced by prop
  const [offsetPx, setOffsetPx] = useState(0);
  const measureOffset = useCallback(() => {
    if (offsetProp != null) {
      setOffsetPx(offsetProp);
      return;
    }
    const el = document.querySelector(headerSelector);
    if (!el) { setOffsetPx(0); return; }
    const pos = getComputedStyle(el).position;
    setOffsetPx(pos === "fixed" ? (el.offsetHeight || 160) : 0);
  }, [headerSelector, offsetProp]);

  useEffect(() => {
    measureOffset();
    const onResize = () => measureOffset();
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [measureOffset]);

  // Keep active valid if tabs change
  useEffect(() => {
    if (!tabs.some((t) => t.id === activeRef.current)) {
      setActive(tabs?.[0]?.id ?? 0);
    }
  }, [tabs]);

  const sectionIds = useMemo(() => tabs.map(getSectionId), [tabs, getSectionId]);

  // Compute which section is current (used by IO + scroll fallback)
  const suppressUntilRef = useRef(0);
  const computeCurrent = useCallback(() => {
    if (!sectionIds.length) return;

    const off = offsetPx;

    // 1) Best “passed the line” section (last whose top <= offset)
    let passedId = null;
    for (let i = 0; i < sectionIds.length; i++) {
      const sid = sectionIds[i];
      const el = document.getElementById(sid);
      if (!el) continue;
      const top = el.getBoundingClientRect().top - off;
      if (top <= 1) passedId = sid;
      else break;
    }

    // 2) If none passed, choose the closest upcoming section
    let fallbackId = sectionIds[0];
    if (!passedId) {
      let bestDist = Infinity;
      for (let i = 0; i < sectionIds.length; i++) {
        const sid = sectionIds[i];
        const el = document.getElementById(sid);
        if (!el) continue;
        const dist = el.getBoundingClientRect().top - off;
        if (dist >= 0 && dist < bestDist) {
          bestDist = dist;
          fallbackId = sid;
        }
      }
    }

    const targetId = passedId || fallbackId;
    const tab = tabs.find((t) => getSectionId(t) === targetId);
    if (tab && tab.id !== activeRef.current) setActive(tab.id);
  }, [sectionIds, tabs, getSectionId, offsetPx]);

  // IntersectionObserver (primary) + initial sync
  useEffect(() => {
    if (!sectionIds.length) return;

    const elements = sectionIds
      .map((sid) => document.getElementById(sid))
      .filter(Boolean);

    let raf = null;

    const onIntersect = () => {
      if (Date.now() < suppressUntilRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeCurrent);
    };

    if (typeof IntersectionObserver !== "undefined" && elements.length) {
      const io = new IntersectionObserver(onIntersect, {
        root: null,
        // Move the "observation line" below the sticky header
        rootMargin: `-${Math.max(0, offsetPx)}px 0px -60% 0px`,
        threshold: [0, 0.01, 0.5, 1],
      });
      elements.forEach((el) => io.observe(el));

      // Initial sync
      computeCurrent();

      return () => {
        io.disconnect();
        if (raf) cancelAnimationFrame(raf);
      };
    } else {
      // Fallback: run once if we can't observe yet
      requestAnimationFrame(computeCurrent);
      return () => { if (raf) cancelAnimationFrame(raf); };
    }
  }, [sectionIds.join("|"), offsetPx, computeCurrent]);

  // Lightweight scroll fallback (helps at page bottom / rare IO misses)
  useEffect(() => {
    let raf = null;
    const onScroll = () => {
      console.log('scrolling >>>>');
      
      if (Date.now() < suppressUntilRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeCurrent);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [computeCurrent]);

  // Click tab → smooth scroll (respect offset), keep tab visible in tabs strip
  const onChangeTab = useCallback((tabOrIdOrIndex, index, tabsContainerRef, itemRefs) => {
    const tab =
      typeof tabOrIdOrIndex === "object" && tabOrIdOrIndex
        ? tabOrIdOrIndex
        : tabs.find(
            (t, i) =>
              String(t.id) === String(tabOrIdOrIndex) || i === tabOrIdOrIndex
          );

    if (!tab) return;

    setActive(tab.id);
    const sectionId = getSectionId(tab);
    const el = document.getElementById(sectionId);
    if (!el) return;

    // temporarily add scroll-margin-top so it lands below the sticky header
    const prev = el.style.scrollMarginTop;
    el.style.scrollMarginTop = `${offsetPx + 40}px`;
    suppressUntilRef.current = Date.now() + suppressMs; // mute spy briefly
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => (el.style.scrollMarginTop = prev), Math.max(300, suppressMs));

    // keep clicked tab visible horizontally (if strip is scrollable)
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
  }, [tabs, getSectionId, offsetPx, suppressMs]);

  return { active, onChangeTab };
}
