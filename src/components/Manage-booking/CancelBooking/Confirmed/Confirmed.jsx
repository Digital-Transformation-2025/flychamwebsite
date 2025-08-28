'use client';
import React from 'react';
import {
    CheckCircle,
    EnvelopeSimple,
    CreditCard,
    Users,
    Calendar,
    AirplaneTilt,
    Info,
    Envelope,
    Clock,
} from '@phosphor-icons/react';
import NextSteps from './NextSteps';
import ActionButton from './ActionButton';
import RefundSummary from './RefundSummary';
import CancellationSummary from './CancellationSummary';
import HeaderStatus from './HeaderStatus';
import ProgressStatus from './ProgressStatus';
import useIsMobile from '@/hooks/useIsMobile';


const cancellationData = [
    {
        icon: <CreditCard className="w-5 h-5 text-gray-500" />,
        label: "Booking reference (PNR)",
        value: "NHGY70",
    },
    {
        icon: <CreditCard className="w-5 h-5 text-gray-500" />,
        label: "Refund amount",
        value: "USD 645.00",
        valueClass: "text-green-600",
    },
    {
        icon: <Calendar className="w-5 h-5 text-gray-500" />,
        label: "Estimated time to receive your refund   ",
        value: "1/9/2025",
    },
    {
        icon: <AirplaneTilt className="w-5 h-5 text-gray-500" />,
        label: "Routs to cancel ",
        value: "DAM to DXB",
    },
    {
        icon: <Users className="w-5 h-5 text-gray-500" />,
        label: "Passengers",
        value: "2 passengers",
    },
];
const refundData = [
    {
        label: "Refund Request ID",
        value: "RF250820001",
    },
    {
        label: "Request Date",
        value: "August 20, 2025",
    },
    {
        label: "Refund Method",
        value: "Original Payment Method",
    },

];
const nextSteps = [
    "Your tickets are now invalid and cannot be used for travel.",
    "You’ll receive email updates on your refund when complete.",
    "If you need help, kindly reach out to our support team."
];

const CancellationConfirmed
    = () => {

        const isMobile = useIsMobile()
        const iconsSize = isMobile ? 20 :24
        const steps = [
            {
                label: 'Request Received',
                desc: 'Your cancellation request has been successfully submitted and logged in our system.',
                status: 'Completed',
                icon: <CheckCircle size={iconsSize} color="#1E983D" />, // Completed icon
            },
            {
                label: 'Confirmation Email Sent',
                desc: 'Cancellation confirmation has been sent to your registered email',
                status: 'Completed',
                icon: <Envelope size={iconsSize} color="#1E983D" />, // Email icon
            },
            {
                label: 'Refund Under Working',
                desc: 'Your refund has been initiated and will be credited within 20 business days.',
                status: 'Processing...',
                icon: <Clock size={iconsSize} color="#054E72" />, // Clock icon for processing
            },
        ];
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
                <HeaderStatus />
                <ProgressStatus steps={steps} isMobile={isMobile}/>
                <CancellationSummary cancellationData={cancellationData} />
                <RefundSummary refundData={refundData} />
                <NextSteps nextSteps={nextSteps} title="What happens next?" />
                {/* <ActionButton /> */}
            </div>
        );
    };

export default CancellationConfirmed
    ;
