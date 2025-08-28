import React from 'react'


const CancellationSummary = ({ cancellationData }) => (
    <div className="bg-white rounded-lg shadow p-6 mb-6 border-l-8 border-[#054E72]">
        <h3 className="text-[16px] md:text-[18px] font-semibold text-gray-800 mb-4">Cancellation Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4  text-gray-700">
            {cancellationData.map(({ icon, label, value, valueClass }, index) => (
                <div key={index} className="flex  items-start gap-2">
                    <span>
                        {icon}
                    </span>
                    <div className="flex flex-col items-start gap-2">
                        <span className="font-medium text-[12px] md:text-sm  text-gray-600">{label}</span>
                        <span
                            className={`font-medium text-[14px] md:text-[16px] ${valueClass || "text-gray-700"}`}
                        >
                            {value}
                        </span>
                    </div>

                </div>
            ))}
        </div>
    </div>
);


export default CancellationSummary