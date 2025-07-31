'use client'
import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';

const ProgressBar = ({ steps, activeStep }) => {
  const isLg = !useIsMobile(1024);
  const isMb = useIsMobile(1024)
  // Calculate percentage for blue progress
  const completedPercentage = ((activeStep + 1) / steps.length) * ((activeStep === 0 && isMb) ? 150 : 100);
  const getWidth = () => {
    switch (activeStep) {
      case 0:
        return `calc(${completedPercentage}% )`; // No overlap for first step
      case 1:
        return `calc(${completedPercentage}% - 15px)`; // Small overlap for step 2
      case 2:
        return `calc(${completedPercentage}%`; // Bigger overlap for step 3
      default:
        return `calc(${completedPercentage}% + 30px)`; // fallback for others
    }
  };

  return (
    <div className="relative w-full h-[66px] overflow-hidden">

      {/* 🔲 Grey background with arrow shape */}
      <div
        className="absolute w-full h-full bg-[var(--bg-100)]"
        style={{
          clipPath:
            'polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%)'
        }}
      />

      {/* 🔵 Blue progress with arrow shape */}
      <div
        className="absolute h-full bg-[var(--primary-1)] transition-all duration-300 "
        style={{
          width: getWidth(),
          clipPath:
            'polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%)'
        }}
      />


      {/* ⚪ Step Items */}
      <div className="relative z-10 flex justify-between items-center h-full px-4 md:px-10">
        {steps.map((step, index) => {
          const isCompleted = index <= activeStep;
          const isActive = index === activeStep;

          const stepColor = isCompleted ? 'text-white' : 'text-400';
          const borderColor = isCompleted ? 'border-white' : 'border-[var(--text-400)]';

          // 📱 On mobile, active step wider
          const flexClasses = isLg
            ? 'flex-row gap-2 flex-1'
            : isActive
              ? 'flex-[3] flex-row gap-1'
              : 'flex-[0.5] flex-col items-center';

          // Label logic
          const renderLabel = () => {
            if (isLg) {
              return <span className={`text-sm font-medium ${stepColor}`}>{step.label}</span>;
            }
            if (isActive) {
              return (

                <span className={`text-sm font-medium text-white `}>{step.label}</span>
              );
            }
            return null;
          };

          return (
            <div
              key={index}
              className={`flex items-center ${flexClasses} transition-all duration-300`}
            >
              {/* Circle */}
              <div
                className={`w-[26px] h-[26px] flex items-center justify-center rounded-full border ${borderColor} text-xs ${stepColor}`}
              >
                {index + 1}
              </div>

              {/* Label */}
              {renderLabel()}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
