import { useEffect } from "react";

const useScrollToTop = (scrollRef, deps = []) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, deps);
};

export default useScrollToTop;
