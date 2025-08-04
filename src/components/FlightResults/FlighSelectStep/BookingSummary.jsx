'use client';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import React from 'react';
import { useSelector } from 'react-redux';

const BookingSummary = ({ onContinue, setSelectedFlight, selectedType }) => {
    const { flights } = useSelector((s) => s.flights);

    return (
        <div className="flex flex-col md:flex-row-reverse justify-between items-stretch w-full gap-4">

            {/* Right: Total + Continue */}
            <div className="w-full md:w-auto flex flex-col md:flex-row items-start md:items-center justify-between md:justify-end gap-4">

                {/* Booking Total */}
                <div className="flex flex-col text-center md:text-start w-full md:w-auto gap-1 flex-1 md:flex-none">
                    <div className="text-[#5F5F5C] font-medium text-sm sm:text-base md:text-lg lg:text-xl">
                        Booking total:
                    </div>
                    <div className="text-[#3E3E3B] font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl">
                        {flights?.[0]?.common_info?.currency} {selectedType.price}
                    </div>
                </div>

                {/* Continue Button */}
                <button
                    onClick={onContinue}
                    className="group  w-full md:w-auto px-6 py-3 bg-[var(--secondary-1)] hover:bg-[#C2B48B] text-white font-bold text-base sm:text-[16px] font-montserrat rounded-md flex items-center justify-center gap-2 transition-all duration-200"
                >
                    Continue to Passenger
                    <CaretRight
                        size={20}
                        weight="regular"
                        className="transform transition-transform duration-200 group-hover:translate-x-1"
                    />
                </button>
            </div>

            {/* Left: Back Button */}
            <div className="w-full md:w-auto">
                <button
                    onClick={() => setSelectedFlight(null)}
                    className="group w-full md:w-auto px-6 py-3 border border-[var(--primary-1)] text-[var(--primary-1)] hover:bg-[var(--primary-1)] hover:text-white font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-all duration-200"
                >
                    
                    <CaretLeft
                        size={20}
                        weight="regular"
                        className="transform transition-transform duration-200 group-hover:-translate-x-1"
                    />
                    Back to flights
                </button>
            </div>

        </div>
    );
};

export default BookingSummary;
