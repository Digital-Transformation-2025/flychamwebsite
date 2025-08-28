import { useState } from "react";
import NextSteps from "../Confirmed/NextSteps";
import { Bell, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import useIsMobile from "@/hooks/useIsMobile";

const RefundStatus = () => {
    const [daysLeft] = useState(18); // Example days remaining
    const [refundAmount] = useState("USD 645.00");
    const [refundStatus] = useState("2 days of 20");
    const [expectedDate] = useState("10 SEP 2025");
    const [progress] = useState(10); // Example progress (in percent)

    const BookingInfo = () => {
        const info = [
            { label: 'Booking reservation', value: 'NHG7Y0' },
            { label: 'Request Date', value: 'August 20, 2025' },
            { label: 'Refund Request ID', value: 'RF250820001' },
        ];

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 text-sm text-[#054E72] bg-50 border border-[#F5F5F4] p-4 rounded-lg shadow-sm">
                {info.map((item) => (
                    <div key={item.label} className="flex flex-col items-start gap-1 min-w-0">
                        <span className="text-sm md:text-base font-medium text-600">{item.label}</span>
                        <span className="text-lg md:text-2xl font-semibold truncate">{item.value}</span>
                    </div>
                ))}
            </div>
        );
    };


    const RefundProgress = ({ isMobile }) => {
        const progress = 2; // Example: 2 days of 20
        const totalDays = 20; // Total days for refund
        const refundStatus = "In Progress"; // Example status

        return (
            <div className="mb-6 space-y-3 bg-50 border border-[#F5F5F4] p-4 rounded-lg shadow-sm">

                <div className="flex justify-between items-center">
                    <div className="text-700 font-semibold text-lg md:text-[18px] ">Refund Progress</div>
                    <span
                        className={`px-3 py-2 text-[12px] md:text-xs rounded-full font-medium bg-[#054E72]/10 text-primary-1`}
                    >
                        {refundStatus}
                    </span>
                </div>

                <div className="text-sm ">
                    <span className="font-medium text-sm   md:text-[16px]">Your refund of {`USD 645.00`} is being processed</span>
                </div>
                <div className=" text-sm md:text-[16px] text-primary-900 font-semibold">{progress} days of {totalDays}</div>

                <div className="w-full bg-200 rounded-lg h-4 relative">
                    <div
                        className="bg-[#054E72] h-full rounded-lg"
                        style={{ width: `${(progress / totalDays) * 100}%` }}
                    />
                </div>
                <RefundDetails isMobile={isMobile} />
            </div>
        );
    };


    // Refund Details Section
    const RefundDetails = ({ isMobile }) => {
        let isCompleted = false
        return (
            !isCompleted ?

                <div className="flex gap-3 justify-between my-6">
                    <div className="w-full bg-blue-100 p-4 rounded-lg">
                        <div className="font-medium text-sm md:text-[18px] text-primary-900  mb-3">Days Left</div>
                        <div className="text-lg md:text-2xl text-primary-1 font-semibold">{daysLeft} days remaining</div>
                        <div className="text-sm md:text-[16px] text-primary-500">Until expected completion</div>
                    </div>

                    <div className="w-full bg-[#1E983D]/10 p-4 rounded-lg">
                        <div className="font-medium text-lg  md:text-xl  text-[#044214] mb-3">Expected Date</div>
                        <div className="text-lg md:text-2xl font-semibold text-[#1E983D]">{expectedDate}</div>
                        <div className="text-sm md:text-[16px] text-[#1F8B3A]">Estimated completion</div>
                    </div>
                </div> :

                <div className="w-full bg-[#1E983D]/10 flex items-center justify-center flex-col p-12 rounded-lg ">
                    <div className="text-lg md:text-2xl font-semibold text-[#1E983D] flex items-center gap-1 md:gap-2">
                        <CheckCircle color="#1E983D" size={isMobile ? 22 : 30} />
                        Refund completed successfully
                    </div>
                </div>
        )
    }

    const nextSteps = [
        "Wait for Bank Processing.",
        "Check Your Statement.",
        "If you need any help or support please Contact Us."
    ];
    const isMobile = useIsMobile()

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 my-12">
            <h1 className="text-2xl md:text-3xl text-700 font-semibold mb-6">Track Refund Status</h1>
            <BookingInfo />
            <RefundProgress isMobile={isMobile} />

            <NextSteps nextSteps={nextSteps} title="What's Next?"
                icon={<Bell size={isMobile ? 18 : 24} weight="bold" className="text-primary-1 mt-1 md:mt-0" />

                } />
        </div>
    );
};

export default RefundStatus;
