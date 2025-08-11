'use client';
import React, {useRef, useState, useLayoutEffect} from 'react';



const Tabs = ({ tabs, value = 0, onChange }) => {
  const [active, setActive] = useState(value);
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  // Measure the active tab and update underline
  const measure = () => {
    const container = containerRef.current;
    const el = itemRefs.current[active];
    if (!container || !el) return;

    const cRect = container.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setUnderline({
      left: r.left - cRect.left,
      width: r.width,
    });
  };

  useLayoutEffect(() => {
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, tabs]);

  const handleClick = (i) => {
    setActive(i);
    onChange?.(i);
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="border-b border-[#EAEAE8] max-w-[90%] md:max-w-[70%]  mx-auto relative">
        <ul
          ref={containerRef}
          className="relative flex flex-wrap gap-6 md:gap-10"
        >
          {tabs.map((label, i) => {
            const isActive = i === active;
            return (
              <li key={label} className="relative">
                <button
                  ref={el => (itemRefs.current[i] = el)}
                  type="button"
                  onClick={() => handleClick(i)}
                  className={[
                    'whitespace-nowrap py-4 text-sm transition-colors',
                    isActive ? 'text-primary-1 font-medium' : 'text-[#8A8A87]',
                  ].join(' ')}
                >
                  {label}
                </button>
              </li>
            );
          })}
          {/* Animated underline that matches active tab width */}
          <span
            className="pointer-events-none absolute bottom-[-1px] h-[3px] rounded-full bg-primary-1 transition-all duration-300"
            style={{ left: underline.left, width: underline.width }}
          />
        </ul>
      </div>
    </nav>
  );
};

export default Tabs;
