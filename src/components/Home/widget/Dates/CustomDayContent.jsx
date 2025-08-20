'use client'
import React from 'react';

const CustomDayContent = ({ date, activeModifiers, isArabic }) => {
    const { selected, range_start, range_end } = activeModifiers;
    return (
        <div
            className={`text-center leading-tight w-full h-full py-1 ${selected ? 'bg-[#B6A889] text-white' : ''} ${range_start ? (isArabic ? 'rounded-r-xl' : 'rounded-l-xl') : ''
                } ${range_end ? (isArabic ? 'rounded-l-xl' : 'rounded-r-xl') : ''}`}
        >
            <div className="text-[13px]">{date.getDate()}</div>
            <div className="text-[11px] font-light text-[#555]">850</div>
        </div>
    );
};

export default CustomDayContent;
