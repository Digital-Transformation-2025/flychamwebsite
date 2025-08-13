'use client';
import React, { useState, useRef, useEffect } from 'react';
import Summary from './Summary';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import { useSelector } from 'react-redux';

const SummaryMobileBox = ({ selectedFlight, selectedType }) => {
    const { selectedPlan } = useSelector((s) => s.flights)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const modalRef = useRef(null);

    const { duration, stops, ecoFare, busFare, segments, flightType } = useFormattedFlightTimes(selectedFlight);

    // Close modal on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isModalOpen]);

    return (
        <>
            {/* Sticky Summary Footer */}
            <div className="w-full block lg:hidden sticky bottom-0 z-50 bg-100 rounded-t-xl px-5 py-4 shadow-[0_-2px_6px_rgba(0,0,0,0.1)]">
                <div className="text-md text-primary-1 font-semibold ">
                    Price summary
                </div>
                <div className="flex justify-between my-4">
                    <div className="flex gap-1">
                        <div className="text-sm text-primary-1 font-medium ">{selectedPlan?.currency}</div>
                        <div className="text-md  text-primary-1 font-bold ">{selectedPlan?.price}</div>
                    </div>
                    <div
                        onClick={() => setIsModalOpen(true)}
                        className="text-sm  text-primary-1 font-medium underline cursor-pointer"
                    >
                        View full details
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-start justify-center pt-8 px-2">
                    {/* Black overlay with fade */}
                    <div className="absolute inset-0 bg-black/40 bg-opacity-40 transition-opacity duration-300"></div>

                    {/* Modal Content */}
                    <div
                        ref={modalRef}
                        className="relative w-full max-w-md max-h-[90vh] overflow-y-auto  rounded-xl p-4 animate-slide-up z-10"
                    >
                        <Summary selectedFlight={selectedFlight} selectedType={selectedType} />
                    </div>
                </div>
            )}
        </>
    );
};

export default SummaryMobileBox;
