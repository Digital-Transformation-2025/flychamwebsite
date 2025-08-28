import React from 'react';
import { Bell } from '@phosphor-icons/react';

const NextSteps = ({ nextSteps = [], title, icon }) => (
    <div className='flex gap-2 bg-50 border border-[#F5F5F4] rounded-lg px-5 py-6 mb-6'>
        <span>
            {icon ?? icon}
        </span>
        <div className="">
            <h3 className="text-lg md:text-[18px] font-semibold text-primary-1 mb-4 flex items-center gap-2">
                <span>{title}</span>
            </h3>
            <ul className="list-disc pl-5 text-sm text-primary-1 font-medium space-y-2">
                {nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
        </div>
    </div>
);

export default NextSteps;

