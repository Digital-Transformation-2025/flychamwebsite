'use client'
import useIsMobile from "@/hooks/useIsMobile";
import React from "react";

const StepFooterBar = ({ activeTab, isNextDisabled, getTripDuration, handleReset, handleStep, onClose, handleSubmit, formikValues }) => {
    const showExtras = activeTab === 3;
    const tripDuration = getTripDuration();
    const isMobile = useIsMobile()

    return (
        <div className={`flex flex-col md:flex-row md:items-center ${!showExtras ? "justify-end" : "justify-between"} gap-4`}>
            {/* Left Side - Trip Duration + Reset */}
            <div
                className={`flex flex-col items-start gap-4 text-sm text-gray-600 min-h-[48px] transition-opacity duration-300`}
                style={{ opacity: showExtras && (formikValues.dateStart) ? 1 : 0 }}
            >
                <span className="text-black">
                    {tripDuration || '‎'}
                </span>
   
            </div>

            {/* Right Side - Navigation Buttons */}
            {(activeTab == 2 || activeTab == 3) &&

                <div className="flex flex-start items-center gap-6">

                    <button
                        onClick={() => handleStep("back")}
                        className="px-6 py-2 border border-main text-main rounded-md text-sm font-medium hover:bg-gray-50"
                    >
                        {activeTab === 3 ? "Close" : "Back"}
                    </button>
                    <button
                        onClick={() => {
                            if (activeTab === 3) return isMobile ? onClose?.() : handleSubmit?.();
                            if (activeTab === 2) handleStep?.("next");
                        }}

                        disabled={isNextDisabled()}
                        className={`cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-opacity duration-200 ${isNextDisabled()
                            ? "bg-gray-400 text-white cursor-not-allowed"
                            : "bg-[#B59C6D] text-white hover:opacity-90"
                            }`}
                        type={activeTab === 3 ? "submit" : "button"}
                    >
                        {activeTab === 3 ? "Search flights" : "Next"}
                    </button>
                </div>
            }

        </div>
    );
};

export default StepFooterBar;
