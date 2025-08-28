import React from 'react'

const RefundSummary = ({refundData}) => (
    <div className="bg-white rounded-lg shadow p-6 mb-6 border-l-8 border-[#BAA981]">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Refund information </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            {refundData.map(({ icon, label, value, valueClass }, index) => (
                <div key={index} className="flex flex-col items-start gap-2">
                    <div className="flex items-center gap-3">
                        <span className="font-medium text-[12px] md:text-sm  text-gray-600">{label}</span>
                    </div>
                    <span
                        className={`font-medium text-[14px] md:text-[16px]  ${valueClass || "text-gray-700"}`}
                    >
                        {value}
                    </span>
                </div>
            ))}
        </div>
    </div>
);

export default RefundSummary