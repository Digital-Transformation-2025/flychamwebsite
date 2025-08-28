'use client';
import React, { useState, useRef, useEffect } from 'react';
import Summary from './Summary';
import { useSelector } from 'react-redux';
import useModal from '@/hooks/useModal';
import Modal from '@/components/Ui/Modal';

const SummaryMobileBox = ({ selectedFlight, selectedType }) => {
    const { selectedPlan } = useSelector((s) => s.flights)
    const { open, show, hide } = useModal();


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
                        onClick={show}
                        className="text-sm  text-primary-1 font-medium underline cursor-pointer"
                    >
                        View full details
                    </div>
                </div>
            </div>

            <Modal open={open} onClose={hide} align="start">
                <Summary selectedFlight={selectedFlight} selectedType={selectedType} />
            </Modal>
        </>
    );
};

export default SummaryMobileBox;
