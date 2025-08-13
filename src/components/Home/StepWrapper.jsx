// StepWrapper.jsx
'use client'
import React from "react";
import StepFooterBar from "./StepFooterBar";
import { flushSync } from "react-dom";

const StepWrapper = ({ children, setFieldValue, handleSubmit, onClose, formikValues, setCurrentMonth,isNavigating }) => {
    const activeTab = formikValues.type;

    const handleStep = (direction) => {
        if (direction === "back") {
            if (activeTab === 3) onClose?.();
            else flushSync(() => {
                setFieldValue("type", activeTab - 1);
            });
        } else if (direction === "next") {
            if (activeTab !== 3) flushSync(() => {
                setFieldValue("type", activeTab + 1);
            });
        }
    };

    const isNextDisabled = () => {
        const { source, destination, dateStart, dateEnd, tripType } = formikValues;
        switch (activeTab) {
            case 0: return !source;
            case 1: return !destination;
            case 3: return tripType === 'Return' ? !(dateStart && dateEnd) : !dateStart;
            default: return false;
        }
    };

    const getTripDuration = () => {
        const { dateStart, dateEnd, tripType } = formikValues;
        if (tripType === "Return" && dateStart && dateEnd) {
            const diff = Math.ceil((new Date(dateEnd) - new Date(dateStart)) / 86400000);
            return diff > 0 ? `${diff} days your trip` : '';
        }
        return '';
    };

    const handleReset = () => {
        setFieldValue("dateStart", null);
        setFieldValue("dateEnd", null);
        setCurrentMonth(new Date());
    };

    return (
        <div className="bg-white rounded-2xl shadow overflow-hidden px-6 pt-3 pb-6">
            {children}

            {/* ✅ Real form submit; no onClick submit juggling */}
            <form onSubmit={handleSubmit}>
                <StepFooterBar
                    activeTab={activeTab}
                    isNextDisabled={isNextDisabled}
                    getTripDuration={getTripDuration}
                    handleReset={handleReset}
                    handleStep={handleStep}
                    onClose={onClose}
                    formikValues={formikValues}
                    isNavigating={isNavigating}
                />
            </form>
        </div>
    );
};

export default StepWrapper;
