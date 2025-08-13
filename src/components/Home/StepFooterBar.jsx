// StepFooterBar.jsx
'use client'
import React from "react";

const StepFooterBar = ({
  activeTab,
  isNextDisabled,
  getTripDuration,
  handleStep,
  onClose,
  formikValues,
    isNavigating
}) => {
  const showExtras = activeTab === 3;
  const tripDuration = getTripDuration();
  const disabled = isNextDisabled();

  return (
    <div className={`flex flex-col md:flex-row md:items-center ${!showExtras ? "justify-end" : "justify-between"} gap-4`}>
      <div
        className="flex flex-col items-start gap-4 text-sm text-gray-600 min-h-[48px] transition-opacity duration-300"
        style={{ opacity: showExtras && formikValues?.dateStart ? 1 : 0 }}
      >
        <span className="text-black">{tripDuration || "‎"}</span>
      </div>

      {(activeTab === 2 || activeTab === 3) && (
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => handleStep("back")}
            className="px-6 py-2 border border-main text-main rounded-md text-sm font-medium hover:bg-gray-50"
          >
            {activeTab === 3 ? "Close" : "Back"}
          </button>

          {/* Step 2: Next advances state only */}
          {activeTab === 2 && (
            <button
              type="button"
              onClick={() => handleStep("next")}
              disabled={disabled}
              className={`cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-opacity duration-200 ${
                disabled ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#B59C6D] text-white hover:opacity-90"
              }`}
            >
              Next
            </button>
          )}

          {/* Step 3: Pure native submit inside the <form> above */}
          {activeTab === 3 && (
            <button
              type="submit"
              disabled={disabled}
              className={`cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-opacity duration-200 ${
                disabled ? "bg-gray-400 text-white cursor-not-allowed" : "bg-[#B59C6D] text-white hover:opacity-90"
              }`}
            >
              Search flights
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StepFooterBar;
