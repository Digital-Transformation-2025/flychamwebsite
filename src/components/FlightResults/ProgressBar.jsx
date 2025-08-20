'use client'
import useIsMobile from '@/hooks/useIsMobile';
import { Check } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const ProgressBar = ({ steps, activeStep }) => {
  const isLg = !useIsMobile(1024);
  const isMb = useIsMobile(1024)
  const INACTIVE_GAP_X = 'mx-8';
  // Calculate percentage for blue progress
  const completedPercentage = ((activeStep + 1) / steps.length) * ((activeStep === 0 && isMb) ? 150 : 100);
  // update getWidth to make active bg full-width on mobile
  const getWidth = () => {
    // if (isMb) return '100%'; // mobile: fill the whole bar
    switch (activeStep) {
      case 0:
        return `calc(${completedPercentage}% )`;
      case 1:
        return `calc(${completedPercentage}% - 15px)`;
      case 2:
        return `calc(${completedPercentage}%`;
      default:
        return `calc(${completedPercentage}% + 30px)`;
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
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          const stepColor = isCompleted ? `text-white ` : `text-400 ${isActive && '!text-white'}`;

          // 📱 On mobile, active step wider
          const flexClasses = isLg
            ? 'flex-row gap-2 flex-3'
            : isActive
              ? 'flex-[3] flex-row gap-3'
              : 'flex-[0.5] flex-col items-center';

          // Label logic
          const renderLabel = () => {
            if (isLg) {
              return <span className={`text-sm font-medium ${stepColor}`}>{step.label}</span>;
            }

            if (isActive) {
              return (
                <span className={`text-sm font-medium text-white`}>{step.label}</span>
              );
            }
            return null;
          };

          return (
            <div
              key={index}
              // update wrapper div className
              className={`flex items-center ${flexClasses} transition-all duration-300 ${(index > activeStep && !isLg) ? INACTIVE_GAP_X : ''}`}
            >
              {/* Circle */}
              <div
                className={`w-[26px] h-[26px] flex items-center justify-center rounded-full border text-xs 
    ${isCompleted
                    ? 'bg-white text-[var(--primary-1)] border-white'
                    : 'bg-transparent text-[var(--text-400)] border-[var(--text-400)]'
                  }
                  ${(!isCompleted && isActive && 'bg-transparent text-white border-white')}
  `}
              >
                {isCompleted ? <Check size={16} weight="bold" /> : index + 1}
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
