import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import React from 'react';

const NavigationArrows = ({ isNextDisabled = false, isPrevDisabled = true }) => {
    const getArrowClasses = (isDisabled) =>
        `flex items-center cursor-pointer ${isDisabled ? 'text-gray-400 cursor-not-allowed' : 'text-primary-1'}`;

    const getIconClasses = (isDisabled) =>
        `mx-2 cursor-pointer ${isDisabled ? 'bg-gray-300 text-gray-500' : 'bg-primary-1 text-white'} rounded-full p-2 w-9 h-9`;

    return (
        <div className="flex items-center justify-end gap-4">
            <button
                className={`${getArrowClasses(isPrevDisabled)} hover:text-primary-1/50 text-base sm:text-lg md:text-xl`}
                disabled={isPrevDisabled}
            >
                <ArrowLeft size={20} className={`${getIconClasses(isPrevDisabled)} text-sm sm:text-base md:text-xl`} />
                <span className="text-sm sm:text-base md:text-lg">Previous</span>
            </button>
            <button
                className={`${getArrowClasses(isNextDisabled)} hover:text-primary-1/50 text-base sm:text-lg md:text-xl`}
                disabled={isNextDisabled}
            >
                <span className="text-sm sm:text-base md:text-lg">Next</span>
                <ArrowRight size={24} className={`${getIconClasses(isNextDisabled)} text-sm sm:text-base md:text-xl`} />
            </button>
        </div>
    );
};

export default NavigationArrows;
