import React from 'react'

const SummaryTable = () => {
    return (
        <div className="w-full bg-[#FDFDFC] shadow-md rounded-lg overflow-x-auto">
            <div className="min-w-max">
                {/* Header */}
                <div className="flex bg-[#F5F5F4] px-4 py-2">
                    {["Routes", "Passengers", "Ticket number", "Price"].map((title, index) => (
                        <div key={index} className="w-1/4 md:w-full px-4 text-sm text-[#282826] text-nowrap">
                            {title}
                        </div>
                    ))}
                </div>

                {/* Body */}
                <div className="px-4 py-2 w-full">
                    <div className="flex py-2">
                        {["Damascus to Dubai", "MR. Mouayed Hawari", "386230452362", "900.00"].map((data, index) => (
                            <div key={index} className="w-1/4 md:w-full px-4 text-sm font-semibold text-700">
                                {data}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SummaryTable