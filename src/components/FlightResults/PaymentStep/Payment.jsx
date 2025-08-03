'use client'
import React from 'react';
import Summary from '../PassengerDetails/Summary';
import StripBox from './StripBox';
import StepBtns from '../PassengerDetails/StepBtns';


const Payment = ({ activeStep, setActiveStep, selectedFlight, selectedType, handlePayment }) => {

    return (
        <div className="flex flex-col xl:flex-row gap-6">
            {/* Left side: Form (75%) */}
            <div className="w-full xl:flex-[3]">
                <h1 className="text-2xl text-primary-1 font-semibold">Payment method</h1>

                <StripBox />
                <StepBtns setActiveStep={setActiveStep}
                    handleSubmit={handlePayment}
                    activeStep={activeStep}
                />

            </div>

            {/* Right side: Summary (25%) */}
            <div className="w-full xl:flex-[1]">
                <Summary

                    selectedFlight={selectedFlight}
                    selectedType={selectedType}
                />
            </div>
        </div>
    );
};

export default Payment;
