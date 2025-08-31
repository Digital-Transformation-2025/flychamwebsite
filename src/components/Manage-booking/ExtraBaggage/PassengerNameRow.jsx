import React from 'react'

const PassengerNameRow = ({ name, type, chip }) => (
    <div className="flex w-full items-center justify-between">
        <div className="leading-none">
            <span className="text-[14px] md:text-[14px] font-semibold text-primary-1">
                {name}
            </span>
            <span className="mx-2 text-700 text-[13px] font-normal">({type})</span>
        </div>
        {chip}
    </div>
);

export default PassengerNameRow