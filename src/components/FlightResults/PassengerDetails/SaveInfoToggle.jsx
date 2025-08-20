'use client'
import React from 'react';

const SaveInfoToggle = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-3 cursor-pointer select-none my-4">
      <button
        type="button"
        onClick={() => onChange(!value)}
        className={`w-10 h-6 rounded-full transition-colors duration-300 relative ${
          value ? 'bg-primary-1' : 'bg-gray-300'
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            value ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
      <span className="text-800 text-sm">
        Save information for future purchases
      </span>
    </div>
  );
};

export default SaveInfoToggle;
