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

// ✅ Header Section
const HeaderStatus = () => (
    <div className="text-center my-8">
        <CheckCircle size={130} className="mx-auto  text-[#34A853]" weight="fill" />
        <h2 className="text-4xl  font-semibold text-primary-1 mt-4">Cancellation Confirmed</h2>
        <p className="text-gray-600 text-2xl mt-1">
            Your reservation has been canceled successfully
        </p>
    </div>
);

// ✅ Progress Status Component
const ProgressStatus = () => {
    const steps = [
        {
            label: 'Request Received',
            desc: 'Your cancellation request has been successfully submitted and logged in our system.',
            status: 'Completed',
            icon: <CheckCircle size={24} color="#34C759" />, // Completed icon
        },
        {
            label: 'Confirmation Email Sent',
            desc: 'Cancellation confirmation has been sent to your registered email',
            status: 'Completed',
            icon: <Envelope size={24} color="#34C759" />, // Email icon
        },
        {
            label: 'Refund Under Working',
            desc: 'Your refund has been initiated and will be credited within 20 business days.',
            status: 'Processing...',
            icon: <Clock size={24} color="#054E72" />, // Clock icon for processing
        },
    ];


    return (
        <div className="bg-50 rounded-lg shadow p-6 mb-6 border border-[#F5F5F4]">
            <h3 className="text-lg font-semibold text-800 mb-4">
                Cancellation Progress Status
            </h3>
            <div className="space-y-4">
                {steps.map((step, i) => (
                    <>
                        <div key={i} className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                                <div className={
                                    `w-10 h-10 rounded-full flex items-center justify-center 
                                    ${step.status === 'Completed'
                                        ? 'bg-[#34C759]/10'
                                        : 'bg-[#054E72]/10 '
                                    }
                                    `
                                }>
                                    {step.icon} {/* Render the icon with circle background */}
                                </div>                                <div>
                                    <p className={
                                        `
                                        font-medium text-[15px] 
                                        ${step.status === 'Completed'
                                            ? 'text-[#044214]'
                                            : ' text-primary-1'
                                        }
                                        `
                                    }>{step.label}</p>
                                    <p className="text-sm text-600">{step.desc}</p>
                                </div>
                            </div>
                            <span
                                className={`px-3 py-2 text-xs rounded-full font-medium ${step.status === 'Completed'
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

// ✅ Cancellation Summary
const CancellationSummary = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Cancellation Summary</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span className="font-semibold">NHGY70</span>
                <span className="text-gray-500 text-xs">(PNR)</span>
            </div>
            <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Refund amount:</span>
                <span className="font-semibold text-green-600">USD 645.00</span>
            </div>
            <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Refund date:</span>
                <span className="font-semibold">1/9/2025</span>
            </div>
            <div className="flex items-center gap-2">
                <AirplaneTilt className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Route:</span>
                <span className="font-semibold">DAM to DXB</span>
            </div>
            <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <span className="text-gray-500">Passengers:</span>
                <span className="font-semibold">2 passengers</span>
            </div>
        </div>
    </div>
);

// ✅ Refund Information
const RefundInformation = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Refund Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
                <p className="font-semibold">Refund Request ID</p>
                <p>RF250820001</p>
            </div>
            <div>
                <p className="font-semibold">Request Date</p>
                <p>August 20, 2025</p>
            </div>
            <div>
                <p className="font-semibold">Refund Method</p>
                <p>Original Payment Method</p>
            </div>
        </div>
    </div>
);

// ✅ Next Steps
const NextSteps = () => (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">What happens next?</h3>
        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-2">
            <li>Your tickets are now invalid and cannot be used for travel.</li>
            <li>You’ll receive email updates on your refund when complete.</li>
            <li>
                If you need help, kindly{' '}
                <a href="#" className="text-blue-600 underline">
                    Contact Us
                </a>
                .
            </li>
        </ul>
    </div>
);

// ✅ Action Button
const ActionButton = () => (
    <div className="text-center mt-6">
        <button className="bg-primary-1 text-white px-6 py-3 rounded-lg font-semibold shadow hover:bg-[#043d59]">
            Back to manage booking
        </button>
    </div>
);

// ✅ Main Page
const CancellationConfirmed
    = () => {
        return (
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6">
                <HeaderStatus />
                <ProgressStatus />
                <CancellationSummary />
                <RefundInformation />
                <NextSteps />
                <ActionButton />
            </div>
        );
    };

export default CancellationConfirmed
    ;
