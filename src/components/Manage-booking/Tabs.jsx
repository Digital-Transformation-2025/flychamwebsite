'use client';
import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';

const Tabs = ({ tabs, active = 0, onChange }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  itemRefs.current = tabs.map((_, i) => itemRefs.current[i] || null);

  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // Convert active (id or index) -> index
  const getActiveIndex = () => {
    const byId = tabs.findIndex((t) => String(t.id) === String(active));
    if (byId !== -1) return byId;          // active is an id
    const asNum = Number(active);          // fallback: treat as index
    return Number.isInteger(asNum) && tabs[asNum] ? asNum : 0;
  };
  const activeIndex = getActiveIndex();

  const measure = () => {
    const c = containerRef.current;
    const el = itemRefs.current[activeIndex];
    if (!c || !el) return;
    const cr = c.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    setUnderline({
      left: (er.left - cr.left) + c.scrollLeft, // account for horizontal scroll
      width: er.width,
    });
  };

  useLayoutEffect(() => {
    measure();
  }, [activeIndex, tabs.length]);

  useEffect(() => {
    const onResize = () => measure();
    const onScroll = () => measure();

    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('orientationchange', onResize);
    const c = containerRef.current;
    c?.addEventListener('scroll', onScroll, { passive: true });

    // fonts can change widths after render
    document?.fonts?.ready?.then(measure).catch(() => { });

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
      c?.removeEventListener('scroll', onScroll);
    };
  }, [activeIndex]);

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="px-2 relative w-full md:max-w-[70%] md:mx-auto">
        <ul
          ref={containerRef}
          className="relative flex gap-6 md:gap-10 overflow-x-auto no-scrollbar"
          role="tablist"
        >
          {tabs.map((tab, i) => {
            const isActive = i === activeIndex;
            return (
              <li key={tab.id} className="relative flex-shrink-0">
                <button
                  ref={(el) => (itemRefs.current[i] = el)}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChange?.(tab.id, i, containerRef, itemRefs)}  
                  className={`whitespace-nowrap py-4 text-sm transition-colors ${isActive ? 'text-primary-1 font-medium' : 'text-[#8A8A87]'
                    }`}
                >
                  {tab.label}
                </button>

              </li>
            );
          })}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-0 h-[3px] rounded-full bg-primary-1 transition-all duration-300"
            style={{
              transform: `translateX(${underline.left}px)`,
              width: underline.width,
            }}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Tabs;
