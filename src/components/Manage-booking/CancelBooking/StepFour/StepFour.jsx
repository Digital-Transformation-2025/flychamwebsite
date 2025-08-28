'use client';

import React, { useEffect, useRef, useState } from 'react';
import RefundSummary from './RefundSummary';
import CustomCheckbox from '@/components/Ui/CustomCheckbox';
import VerificationCard from './VerificationCard';
import VerificationSms from './VerificationSms';
import SummaryTable from './SummaryTable';
import useModal from '@/hooks/useModal';
import Modal from '@/components/Ui/Modal';

const StepFour = ({ cancellationOptions, setFieldValue, values }) => {
    const { open, show, hide } = useModal();
    console.log('show', show);

    const { underStandCheck, last4 } = values
    const inputRef = useRef(null);
    const handleChange = (e) => {
        // Allow only numbers, max 4 digits
        const value = e.target.value.replace(/\D/g, "").slice(0, 4);
        setFieldValue('last4', value)
    };
    const handleSendCode = () => {
        setTimeout(() => alert('Verification code sent!'), 2000);
    };
    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        focusInput()
    }, [])


    return (
        <div className="flex flex-col lg:flex-row justify-between gap-8 ">
            {/* Left Section: Cancellation Summary */}
            <div className="flex-[75%]">
                <h3 className="text-lg md:text-2xl text-700 font-semibold mb-6">Review Cancellation Summary</h3>
                <div className=" mb-8 "><SummaryTable /></div>

                {/* Verification Section */}
                <VerificationCard last4={last4} focusInput={focusInput} handleChange={handleChange} inputRef={inputRef} />
                {/* <VerificationSms setFieldValue={setFieldValue} /> */}
            </div>

            {/* Right Section: Refund Summary */}
            <div className="flex-[25%] lg:mt-0 z-10">

                <div className='block lg:hidden'>
                    <Modal open={open} onClose={hide} align="start">
                        <RefundSummary setFieldValue={setFieldValue} />
                    </Modal>
                </div>
                <span onClick={show} className="block lg:hidden underline text-sm text-800 cursor-pointer">
                    View Refund Summary
                </span>
                <div className='hidden lg:block'>
                    <RefundSummary setFieldValue={setFieldValue} />
                </div>

                <div className="flex my-4">
                    <CustomCheckbox
                        checked={underStandCheck}
                        onChange={() => setFieldValue("underStandCheck", !underStandCheck)}
                        label="I understand the cancellation policy and agree to the refund terms. I acknowledge that the refund amount is calculated based on
                        fare rules and cancellation fees."
                        labelColor='primary-1'
                    />
                </div>
            </div>
        </div>
    );
};

export default StepFour;
[]