"use client";

import { useEffect, useMemo, useState } from "react";

export function useTabsScrollSpy(tabs, options = {}) {
  const {
    headerSelector = "#sticky-head",
    offset: offsetProp,
    getSectionId = (t) => `section-${t.id}`,
    rootRef,
  } = options;

  const [offsetMeasured, setOffsetMeasured] = useState(160);
  const [active, setActive] = useState(tabs?.[0]?.id ?? 0);

  // Measure sticky header once if not provided
  useEffect(() => {
    if (offsetProp != null) return;
    const el = document.querySelector(headerSelector);
    if (el) setOffsetMeasured(el.offsetHeight || 160);
  }, [headerSelector, offsetProp]);

  const getCurrentOffset = () => {
    if (offsetProp != null) return offsetProp;
    const el = document.querySelector(headerSelector);
    if (!el) return offsetMeasured;
    const pos = window.getComputedStyle(el).position;
    return pos === "fixed" ? (el.offsetHeight || offsetMeasured) : 0;
  };

  const sectionIds = useMemo(() => tabs.map(getSectionId), [tabs, getSectionId]);
  const sectionToTabId = useMemo(() => {
    const map = {};
    tabs.forEach((t) => { map[getSectionId(t)] = t.id; });
    return map;
  }, [tabs, getSectionId]);

  // Keep active valid if tabs array changes
  useEffect(() => {
    if (!tabs.some((t) => t.id === active)) {
      setActive(tabs?.[0]?.id ?? 0);
    }
  }, [tabs, active]);

  // Observe sections to update active when user scrolls manually
  useEffect(() => {
    if (!sectionIds.length) return;

    const root = rootRef?.current || null;
    const makeMargin = () => `-${getCurrentOffset()}px 0px -60% 0px`;
    let io = new IntersectionObserver(
      (entries) => {
        let best = null;
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          if (!best || e.intersectionRatio > best.intersectionRatio) best = e;
        }
        if (best) {
          const id = sectionToTabId[best.target.id];
          if (id != null && id !== active) setActive(id);
          return;
        }
        const off = getCurrentOffset();
        let current = null;
        for (const sid of sectionIds) {
          const el = document.getElementById(sid);
          if (!el) continue;
          const rect = el.getBoundingClientRect();
          if (rect.top - off < 1) current = sectionToTabId[sid];
          else break;
        }
        if (current != null && current !== active) setActive(current);
      },
      { root, rootMargin: makeMargin(), threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
    );

    const els = sectionIds.map((sid) => document.getElementById(sid)).filter(Boolean);
    els.forEach((el) => io.observe(el));

    // Recreate IO if header height changes (e.g., responsive)
    const onResize = () => {
      io.disconnect();
      io = new IntersectionObserver(
        io.takeRecords ? io.takeRecords.bind(io) : () => { },
        { root, rootMargin: makeMargin(), threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] }
      );
      els.forEach((el) => io.observe(el));
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      io.disconnect();
    };
  }, [sectionIds.join("|"), rootRef, active]);

  // Smooth scroll with one-shot scroll-margin (robust on iOS)
  const scrollToSectionId = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (!el) return;
    const off = getCurrentOffset();

    const prev = el.style.scrollMarginTop;
    el.style.scrollMarginTop = `${off + 8}px`; // small buffer
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    // restore shortly after animation begins
    setTimeout(() => { el.style.scrollMarginTop = prev; }, 400);
  };

  // Accept id, tab object, or index; also optional refs for horizontal tabs strip
  const onChangeTab = (tabOrIdOrIndex, index, tabsContainerRef, itemRefs) => {
    let tab =
      typeof tabOrIdOrIndex === "object" && tabOrIdOrIndex
        ? tabOrIdOrIndex
        : tabs.find((t, i) =>
          String(t.id) === String(tabOrIdOrIndex) || i === tabOrIdOrIndex
        );
    if (!tab) return;

    setActive(tab.id);
    const sectionId = getSectionId(tab);
    requestAnimationFrame(() => scrollToSectionId(sectionId));

    // keep clicked tab visible if strip is scrollable
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

  return { active, onChangeTab };
}
