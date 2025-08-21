// hooks/useStickyHeaderHeight.js
"use client";
import { useEffect, useState } from "react";

export function useStickyHeaderHeight(selector = "#sticky-head") {
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = document.querySelector(selector);
    if (!el) return;

    const compute = () => {
      const pos = getComputedStyle(el).position;
      setH(pos === "fixed" ? (el.offsetHeight || 0) : 0);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(el);
    window.addEventListener("resize", compute, { passive: true });
    window.addEventListener("orientationchange", compute, { passive: true });

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
      window.removeEventListener("orientationchange", compute);
    };
  }, [selector]);

  return h;
}
