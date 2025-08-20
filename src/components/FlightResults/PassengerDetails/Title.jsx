import React from 'react';
import { Info } from '@phosphor-icons/react';

const Title = () => {
    return (
        <div className="w-full">
            <h2 className="mt-4 text-lg sm:text-xl md:text-2xl font-semibold text-700">
                Passenger Details
            </h2>
            <div className="mt-2 flex flex-wrap sm:flex-nowrap items-start sm:items-center gap-2">
                <Info size={18} className="hidden md:block text-[var(--bg-primary-1)] mt-1" weight="fill" />
                <p className="text-[#3A5A6B] text-sm sm:text-[14px] leading-6">
                    Enter the required information for each passenger and be sure that it exactly matches your passport.
                </p>
            </div>
        </div>
    );
};

export default Title;
