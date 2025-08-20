'use client'
import React from 'react';

const CustomCheckbox = ({ checked, onChange, label, error }) => {

    return (

        <label className="inline-flex items-start gap-3 cursor-pointer select-none">
            {/* Checkbox box */}
            <div
                className={`flex justify-center items-center min-w-[20px] min-h-[20px] p-[2px] rounded-[4px] 
                ${checked ? 'bg-primary-1' : 'bg-white'} 
                ${Boolean(error) ? 'border border-alert' : "border border-[#B0B0AE]"}`}
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

            {/* Hidden checkbox input */}
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="hidden"
            />

            {/* Label text */}
            <span className="text-[#1A1A1A] text-sm leading-snug">{label}</span>
        </label>
    );
}

export default CustomCheckbox;
