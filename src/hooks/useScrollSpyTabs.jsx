import { useEffect, useRef, useState } from "react";

export const useScrollSpyTabs = (sectionCount, offset = 100) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef([...Array(sectionCount)].map(() => null));

  const setRef = (el, i) => {
    sectionRefs.current[i] = el;
  };

  // ✅ scroll to section with header offset
  const scrollToSection = (i) => {
    const el = sectionRefs.current[i];
    if (!el) return;

    const top =
      window.scrollY + el.getBoundingClientRect().top - offset; // adjust by sticky header
    window.scrollTo({ top, behavior: "smooth" });

    setActiveIndex(i);
  };

  // ✅ detect section in viewport
  useEffect(() => {
    const handleScroll = () => {
      let newActive = activeIndex;

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const top = rect.top - offset;
        const bottom = rect.bottom - offset;

        if (top <= 0 && bottom > 0) {
          newActive = i;
        }
      });

      if (newActive !== activeIndex) {
        setActiveIndex(newActive);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // run once at start

    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset, activeIndex]);

  return { activeIndex, scrollToSection, setRef };
};
