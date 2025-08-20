import React from 'react';
import { Clock } from '@phosphor-icons/react';

const DateCategoryInfo = ({ date, category }) => {
    return (
        <div className="flex items-center gap-2 text-600 mb-2">
            <Clock size={18} weight="regular" />
            <span className="text-sm md:text-base font-medium">
                {date}
            </span>
            <div className="w-1 h-1 rounded-full bg-600" />
            <span className="text-sm md:text-base bg-[#054e7224] text-[#054E72] font-medium px-3 py-1 rounded-full">
                {category}
            </span>
        </div>
    );
};

export default DateCategoryInfo;
