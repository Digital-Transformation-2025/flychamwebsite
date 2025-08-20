'use client'
import { Check } from "@phosphor-icons/react";

const StepItem = ({ icon, title, value, isActive, isCompleted }) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-2 min-w-[100px]">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center
        ${isActive || isCompleted ? 'bg-main text-white' : 'border border-gray-300 text-main'}`}
      >
        {isCompleted ? <Check size={20} weight="bold" /> : icon}
      </div>
      <div className="flex flex-col">
        <span className={`hidden md:block text-xs ${isActive || isCompleted ? 'text-gray-500' : 'text-gray-400'}`}>
          {title}
        </span>
        <span className={`text-center md:text-start text-xs md:text-sm font-semibold ${isActive || isCompleted ? 'text-main' : 'text-gray-400'}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default StepItem;
