'use client';
import React, { useRef, useState, useLayoutEffect } from 'react';

const Tabs = ({ tabs, active = 0, onChange }) => {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const measure = () => {
    const container = containerRef.current;
    const el = itemRefs.current[active];
    if (!container || !el) return;

    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setUnderline({
      left: elRect.left - containerRect.left + container.scrollLeft,
      width: elRect.width,
    });
  };

  useLayoutEffect(() => {
    measure();
    const handleResize = () => measure();
    const handleScroll = () => measure();

    window.addEventListener('resize', handleResize);
    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleResize);
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, [active, tabs]);

  const handleClick = (tab) => {
    // const section = document.getElementById(tab.id);
    // if (section) {
    //   section.scrollIntoView({ behavior: "smooth", block: "start" });
    // }
    onChange?.(tab);
  };


  return (
    <nav className="w-full bg-white shadow-md">
      <div className="px-2 relative w-full md:max-w-[70%] md:mx-auto">
        <ul
          ref={containerRef}
          className="relative flex gap-6 md:gap-10 overflow-x-auto no-scrollbar"
        >
          {tabs.map((tab, i) => {
            const isActive = i === active;
            return (
              <li key={tab.id} className="relative flex-shrink-0">
                <button
                  ref={(el) => (itemRefs.current[i] = el)}
                  type="button"
                  onClick={() => handleClick(tab)}
                  className={`whitespace-nowrap py-4 text-sm transition-colors ${isActive ? 'text-primary-1 font-medium' : 'text-[#8A8A87]'
                    }`}
                >
                  {tab.label}
                </button>
              </li>
            );
          })}
          <span
            className="pointer-events-none absolute bottom-0 h-[3px] rounded-full bg-primary-1 transition-all duration-300"
            style={{
              left: underline.left,
              width: underline.width,
            }}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Tabs;
