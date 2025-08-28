import React from 'react'

const ProgressStatus = ({ steps, isMobile }) => {
    const circleHolder = isMobile ? '8' : '10'
    const LoadingCircle = () => {
        return <div className="relative inline-flex">
            {/* background disc */}
            <div className="w-10 h-10 rounded-full bg-[#E6EFF3]" />
            {/* rotating arc */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full border-2 border-[#054E72] border-t-transparent border-l-transparent animate-spin" />
            </div>
        </div>
    }
    return (
        <div className="bg-50 rounded-lg shadow p-6 mb-6 border border-[#F5F5F4]">
            <h3 className="text-[16px] md:text-[18px] font-semibold text-800 mb-4">
                Cancellation Progress Status
            </h3>
            <div className="space-y-4">
                {steps.map((step, i) => (
                    <>
                        <div key={i} className="flex items-start justify-between">
                            <div className="flex items-start md:items-center space-x-3">
                                <div
                                    className={`w-${circleHolder} h-${circleHolder} aspect-square shrink-0 rounded-full flex items-center justify-center
    ${step.status === 'Completed' ? 'bg-[#34C759]/10' : 'bg-[#054E72]/10'}`}
                                >

                                    {step.status === 'Completed' ? step.icon : <LoadingCircle />}
                                </div>

                                <div>
                                    <p className={
                                        `
                                        font-medium text-[14px] 
                                        ${step.status === 'Completed'
                                            ? 'text-[#044214]'
                                            : ' text-primary-1'
                                        }
                                        `
                                    }>{step.label}</p>
                                    <p className="text-[12px] md:text-sm text-600">{step.desc}</p>
                                </div>
                            </div>
                            <span
                                className={`p-2 md:px-3 md:py-2 text-[10px] md:text-sm rounded-full font-medium ${step.status === 'Completed'
                                    ? 'bg-[#34C759]/10 text-[#044214]'
                                    : 'bg-[#054E72]/10 text-primary-1'
                                    }`}
                            >
                                {step.status}
                            </span>
                        </div>
                        <div className="w-full border-t border-[#E5E5E5]"></div>
                    </>
                ))}
            </div>

        </div>
    );
};
export default ProgressStatus