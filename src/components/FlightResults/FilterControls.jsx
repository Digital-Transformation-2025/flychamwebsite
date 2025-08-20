'use client'
import getFlightCurrencyAndRegion from '@/util/getFlightCurrencyAndRegion';
import { FunnelSimple } from '@phosphor-icons/react';
import React from 'react';
import { useSelector } from 'react-redux';

const FilterControls = ({ onOpenModal }) => {
    const { flights, IndirectAirPort } = useSelector((s) => s.flights);

    const { currency, region } = getFlightCurrencyAndRegion(flights, IndirectAirPort);

    return (
        <div className="flex gap-6 items-center max-md:w-full max-md:justify-between max-md:mt-4 max-sm:flex-col max-sm:gap-3">
            {/* Currency Selector */}
            <div className=" hidden lg:inline-flex cursor-pointer  justify-center items-center gap-2.5 border w-[152px] h-[37px] p-2.5 rounded-xl border-[var(--bg-200)] bg-50 text-[var(--text-600)] text-sm font-normal max-sm:w-full hover:border-2  hover:border-[var(--bg-200)] hover:bg-100 transition-colors">
                <span>{currency}</span>
            </div>



            {/* Sort & Filter Button */}
            <button
                onClick={onOpenModal}
                className=" cursor-pointer inline-flex h-[37px] justify-center items-center gap-2.5 shrink-0 border w-[152px] p-2.5 rounded-xl border-[var(--bg-200)] text-600 bg-50 hover:border-2 hover:border-[var(--bg-200)] hover:bg-100 hover:text-600 max-sm:w-full transition-colors"
            >


                <FunnelSimple size={20} className="text-600" />

                <div className="hidden sm:block">

                    <span className="text-sm font-normal">Sort and filter</span>
                </div>
            </button>


        </div>
    );
};

export default FilterControls;
