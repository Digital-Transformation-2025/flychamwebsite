'use client';
import React from 'react';
import { format } from 'date-fns';

// ✅ Reusable date display
const DateItem = ({ label, date }) => (
    <div className="flex flex-col text-start flex-start items-start">
        <span>{label}</span>
        {date && <strong>{format(date, 'dd MMM yyyy')}</strong>}
    </div>
);

// ✅ Return trip layout
const ReturnDates = ({ from, to }) => (
    <div className="flex items-center justify-start gap-20">
        <DateItem label="Departure" date={from} />
        <DateItem label="Return" date={to} />
    </div>
);

const SelectedDateDisplayModifyBox = ({ selected, tripType }) => {
    let content = null;

    if (tripType === 'Return' && selected?.from) {
        content = <ReturnDates from={selected.from} to={selected.to} />;
    }
    else if (tripType === 'OneWay' && selected) {
        content = <DateItem label="Departure" date={selected} />;
    } else {
        content = <p className="text-500">Please select your date</p>;
    }

    return (
        <div
            className="text-center w-full text-sm my-5 mb-2 min-h-[20px] transition-opacity duration-300"
            style={{ opacity: content ? 1 : 0 }}
        >
            {content || '‎'}
        </div>
    );
};

export default SelectedDateDisplayModifyBox;
