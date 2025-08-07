'use client';
import React, { useState, useRef, useEffect } from 'react';

const InfoBoxes = ({ guestsComponent, CalendarComponent, openDropdown, setOpenDropdown }) => {
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
                    className="bg-[#F5F5F4] hover:bg-[#E7E7E5] transition-colors duration-200 rounded-xl px-6 py-5 cursor-pointer"
                >
                    <div className="text-gray-500 text-sm">Departure</div>
                    <div className="font-semibold">10 JUL 2025</div>
                </div>

                {openDropdown === 'departure' && (
                    <div className="absolute left-0 mt-1 bg-white shadow-md border rounded-lg w-full z-10">
                        {CalendarComponent}
                    </div>
                )}
            </div>

            {/* Passengers Box */}
            <div ref={passengersRef} className="relative w-full">
                <div
                    onClick={() => toggleDropdown('passengers')}
                    className="bg-[#F5F5F4] hover:bg-[#E7E7E5] transition-colors duration-200 rounded-xl px-6 py-5 cursor-pointer flex justify-between items-center"
                >
                    <div>
                        <div className="text-gray-500 text-sm">Passengers</div>
                        <div className="font-semibold">1 Passenger</div>
                    </div>
                    <span className="text-gray-500">⌄</span>
                </div>

                {openDropdown === 'passengers' && (
                    <div className="absolute left-0 mt-1 bg-white shadow-md border rounded-lg p-4 w-full z-10">
                        {guestsComponent}
                    </div>
                )}
            </div>
        </div>
    );
};

export default InfoBoxes;
