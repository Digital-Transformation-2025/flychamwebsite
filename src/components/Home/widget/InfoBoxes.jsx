'use client';
import React, { useState, useRef, useEffect } from 'react';
import SelectedDateDisplay from './Dates/SelectedDateDisplay';
import SelectedDateDisplayModifyBox from './Dates/SelectedDateDisplayModifyBox';
import { CaretDown, CaretUp } from '@phosphor-icons/react/dist/ssr';

const InfoBoxes = ({ values, selected, tripType, handleReset, guestsComponent, CalendarComponent, openDropdown, setOpenDropdown }) => {
    const { adults, children, infants } = values
    const total = adults + children + infants
    const departureRef = useRef(null);
    const passengersRef = useRef(null);

    const toggleDropdown = (box) => {
        setOpenDropdown((prev) => (prev === box ? null : box));
    };

    useEffect(() => {
        if (!openDropdown) return;

        const handleClickOutside = (event) => {
            const refs = [departureRef.current, passengersRef.current];
            // If click is not inside any open dropdown's wrapper, close it
            if (!refs.some((ref) => ref && ref.contains(event.target))) {
                setOpenDropdown(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openDropdown]);

    return (
        <div className="flex gap-4 my-4 relative">
            {/* Departure Box */}
            <div ref={departureRef} className=" w-full">
                <div
                    onClick={() => toggleDropdown('departure')}
                    className="flex justify-center items-center gap-3  bg-[#F5F5F4] hover:bg-[#E7E7E5] transition-colors duration-200 rounded-xl px-6 py-5 cursor-pointer"
                >
                    <SelectedDateDisplayModifyBox selected={selected} tripType={tripType} handleReset={handleReset} />

                    {/* <div className="flex flex-col">
                        <div className="text-gray-500 text-sm">Departure</div>
                        <div className="font-semibold">10 JUL 2025</div>
                    </div>
                    <div className="flex flex-col">

                        <div className="text-gray-500 text-sm">Return</div>
                        <div className="font-semibold">10 JUL 2025</div>
                    </div> */}
                </div>

                {openDropdown === 'departure' && (
                    <div className="absolute left-0 mt-1 bg-white shadow-md  rounded-lg w-full z-10">
                        {CalendarComponent}
                    </div>
                )}
            </div>

            {/* Passengers Box */}
            <div ref={passengersRef} className="relative w-full">
                <div
                    onClick={() => toggleDropdown('passengers')}
                    className="h-[100%] bg-[#F5F5F4] hover:bg-[#E7E7E5] transition-colors duration-200 rounded-xl px-6 py-5 cursor-pointer flex justify-between items-center"
                >
                    <div>
                        <div className="text-gray-500 text-sm">Passengers</div>
                        <div className="font-semibold">{`${total} ${total > 1 ? 'Passengers' : 'Passenger'} `} </div>
                    </div>
                    <span className="text-gray-500">
                        {!openDropdown ?
                            <CaretDown size={16} />

                            :
                            <CaretUp size={16} />
                        }

                    </span>
                </div>

                {openDropdown === 'passengers' && (
                    <div className="absolute left-0 mt-1 bg-white shadow-md  rounded-lg p-4 w-full z-10">
                        {guestsComponent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoBoxes;
