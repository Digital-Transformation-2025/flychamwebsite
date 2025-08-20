'use client';
import React from 'react';

const CustomCheckbox = ({ checked, onChange, label }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer select-none">
      <div
        className={`flex justify-center items-center w-5 h-5 p-[2px] rounded-[4px] 
          ${checked ? 'bg-[#054E72]' : 'bg-white border border-[#B0B0AE]'}`}
      >
        {checked && (
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <span className="text-[#1A1A1A] text-sm">{label}</span>
    </label>
  );
};

export default CustomCheckbox;
