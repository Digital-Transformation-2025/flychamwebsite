"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function useTabsScrollSpy(tabs, options = {}) {
  const {
    headerSelector = "#sticky-head",
    offset: offsetProp,                 // pass a number to force an offset
    getSectionId = (t) => `section-${t.id}`,
    suppressMs = 400,                   // mute spy briefly after programmatic scroll
  } = options;

  const [active, setActive] = useState(tabs?.[0]?.id ?? 0);
  const activeRef = useRef(active);
  useEffect(() => { activeRef.current = active; }, [active]);

  // Measure sticky header when it's fixed; 0 when static
  const measuredOffsetRef = useRef(160);
  const getOffset = () => {
    if (offsetProp != null) return offsetProp;
    const el = document.querySelector(headerSelector);
    if (!el) return measuredOffsetRef.current;
    const pos = window.getComputedStyle(el).position;
    return pos === "fixed" ? (el.offsetHeight || measuredOffsetRef.current) : 0;
  };

  useEffect(() => {
    if (offsetProp != null) return;
    const el = document.querySelector(headerSelector);
    if (el) measuredOffsetRef.current = el.offsetHeight || 160;

    const onResize = () => {
      const el2 = document.querySelector(headerSelector);
      if (el2) measuredOffsetRef.current = el2.offsetHeight || 160;
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [headerSelector, offsetProp]);

  // Keep active valid if tabs change
  useEffect(() => {
    if (!tabs.some((t) => t.id === activeRef.current)) {
      setActive(tabs?.[0]?.id ?? 0);
    }
  }, [tabs]);

  const sectionIds = useMemo(() => tabs.map(getSectionId), [tabs, getSectionId]);

  // Manual scroll → highlight
  const suppressUntilRef = useRef(0);
  useEffect(() => {
    if (!sectionIds.length) return;

    const computeCurrent = () => {
      const off = getOffset();

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

      // 2) If none passed, choose the closest upcoming section (smallest positive distance)
      let fallbackId = sectionIds[0]; // default to first
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
    };

    let raf = null;
    const onScroll = () => {
      console.log('scrolling');
      
      // Ignore while we’re animating a programmatic scroll
      if (Date.now() < suppressUntilRef.current) return;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeCurrent);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // run once so first tab is highlighted initially
    computeCurrent();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join("|"), tabs.length]);

  // Click tab → smooth scroll (respect offset), keep tab visible in tabs strip
  const onChangeTab = (tabOrIdOrIndex, index, tabsContainerRef, itemRefs) => {
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
    el.style.scrollMarginTop = `${getOffset() + 8}px`;
    suppressUntilRef.current = Date.now() + suppressMs; // mute spy briefly
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => (el.style.scrollMarginTop = prev), 400);

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
  };
  console.log('active', active);

  return { active, onChangeTab };
}
