'use client';

import useIsArabic from '@/hooks/useIsArabic';
import React from 'react';

const CustomScroller = ({
  trackRef,
  thumbTop,
  thumbHeight,
  handleTrackClick,
  handleThumbMouseDown,
}) => {
  const isArabic = useIsArabic()

  return (
    <div className={`absolute ${!isArabic ? 'right-4' : `left-4`} top-1/2 -translate-y-1/2 z-50`}>
      <div
        ref={trackRef}
        onClick={handleTrackClick}
        className="relative w-[6px] h-[250px] bg-[url('/mnt/data/d3a96e8f-fa31-4c45-ba6c-323ae22b950c.webp')] bg-cover bg-center rounded-full cursor-pointer"
        style={{ borderRadius: '24px' }}
      >
        <div
          onMouseDown={handleThumbMouseDown}
          style={{
            width: '150%',
            height: `${thumbHeight}px`,
            background: '#BAA981',
            borderRadius: 24,
            position: 'absolute',
            top: `${thumbTop}px`,
            transition: 'top 0.3s ease',
            cursor: 'grab',
          }}
        />
      </div>
    </div>
  );
};

export default CustomScroller;
