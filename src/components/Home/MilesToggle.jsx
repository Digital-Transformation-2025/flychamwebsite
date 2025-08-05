'use client'
import React from 'react';

const MilesToggle = ({ isMobile, setFieldValue, miles }) => {
  return (
    <div className={`flex items-center gap-2 ${isMobile ? 'mt-2' : ''}`}>
      <label className="relative inline-flex items-center w-9 h-5 cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={miles}
          onChange={() => setFieldValue("miles", !miles)}
          // disabled
        />
        {/* Track */}
        <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-main transition-colors duration-300" />

        {/* Thumb */}
        <div className="absolute top-[2px] left-[2px] w-4 h-4 bg-white rounded-full shadow-md transition-all duration-300 transform peer-checked:translate-x-[16px]" />
      </label>

      <span className="text-sm text-main font-semibold whitespace-nowrap">
        Book with Miles
      </span>
    </div>
  );
};

export default MilesToggle;
