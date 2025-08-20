'use client'
import { useEffect, useRef, useState } from 'react';

export default function useCustomScroller(sectionCount) {
    const [current, setCurrent] = useState(0);
    const isScrolling = useRef(false);
    const isDragging = useRef(false);
    const trackRef = useRef(null);

    const thumbHeight = 50;
    const trackHeight = 250;
    const gap = (trackHeight - thumbHeight) / (sectionCount - 1);
    const thumbTop = current * gap;

    // Scroll handler
useEffect(() => {
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  const handleWheel = (e) => {
    if (isTouchDevice) return; // Allow native scroll on touch devices

    e.preventDefault();
    if (isScrolling.current) return;

    isScrolling.current = true;

    setCurrent((prev) => {
      if (e.deltaY > 0) return Math.min(prev + 1, sectionCount - 1);
      return Math.max(prev - 1, 0);
    });

    setTimeout(() => {
      isScrolling.current = false;
    }, 1000);
  };

  window.addEventListener('wheel', handleWheel, { passive: false });
  return () => window.removeEventListener('wheel', handleWheel);
}, [sectionCount]);


useEffect(() => {
  let startY = 0;
  let endY = 0;

  const handleTouchStart = (e) => {
    startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    endY = e.changedTouches[0].clientY;
    const deltaY = startY - endY;

    if (Math.abs(deltaY) < 50) return; // Ignore small swipes

    if (deltaY > 0) {
      setCurrent((prev) => Math.min(prev + 1, sectionCount - 1)); // Swipe up
    } else {
      setCurrent((prev) => Math.max(prev - 1, 0)); // Swipe down
    }
  };

  window.addEventListener('touchstart', handleTouchStart);
  window.addEventListener('touchend', handleTouchEnd);

  return () => {
    window.removeEventListener('touchstart', handleTouchStart);
    window.removeEventListener('touchend', handleTouchEnd);
  };
}, [sectionCount]);

    // Track click handler
    const handleTrackClick = (e) => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const clickY = e.clientY - rect.top;
        const index = Math.round(clickY / gap);
        setCurrent(Math.max(0, Math.min(index, sectionCount - 1)));
    };

    // Drag thumb handler
    const handleThumbMouseDown = (e) => {
        e.preventDefault();
        isDragging.current = true;

        const handleMouseMove = (moveEvent) => {
            if (!isDragging.current || !trackRef.current) return;
            const rect = trackRef.current.getBoundingClientRect();
            const offsetY = moveEvent.clientY - rect.top;
            const index = Math.round(offsetY / gap);
            setCurrent(Math.max(0, Math.min(index, sectionCount - 1)));
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };
    const scrollToNext = () => {
        setCurrent((prev) => Math.min(prev + 1, sectionCount - 1));
    };
    return {
        current,
        setCurrent,
        thumbTop,
        trackRef,
        handleTrackClick,
        handleThumbMouseDown,
        thumbHeight,
        trackHeight, scrollToNext
    };
}
