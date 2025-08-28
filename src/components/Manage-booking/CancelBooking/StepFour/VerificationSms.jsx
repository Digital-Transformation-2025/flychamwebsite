'use client'
import React, { useState, useEffect } from 'react';
import { EnvelopeSimple, ChatCircleDots, Clock } from '@phosphor-icons/react';
import Input from '@/components/Ui/Input';
import { ChatText, Envelope } from '@phosphor-icons/react/dist/ssr';

const VerificationSms = ({ setFieldValue }) => {
    const [timeLeft, setTimeLeft] = useState(0); // in seconds
    const [isSending, setIsSending] = useState(false);

    // countdown effect
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && isSending) {
            setIsSending(false)
            setIsSending(false); // Reset state after timer ends
        }
    }, [timeLeft, isSending]);

    const handleSendCode = () => {
        setIsSending(true);
        setTimeLeft(60 * 3);
    };

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    return (
        <div className="bg-white max-w-xl my-12">
            <h2 className="text-lg md:text-2xl mb-6 font-semibold text-gray-800 ">Verification</h2>

            <p className="text-sm text-gray-700 mb-4">
                We will send a verification code to mobile number via <span className="font-semibold">Email </span>
                that ending with <span className="text-primary-1 font-semibold">9806</span>.
                The code will expire in <span className="font-semibold text-black">3 minutes.</span>
            </p>

            {!isSending ? (
                <button
                    onClick={handleSendCode}
                    className="px-6 py-2 text-xs md:text-[16px] bg-primary-1 text-white font-medium md:font-semibold rounded-md hover:bg-primary-1 transition"
                >
                    Send the code
                </button>
            ) : (
                <div>
                    {/* input + button */}
                    <div className="flex items-center gap-2 mb-3  ">
                        <Input
                            onChange={(e) => setFieldValue('code', e.target.value)}
                            name={`code`}
                            label="Enter Code"
                            className="px-4 py-2 border  rounded-md  font-semibold "
                        />
                        <button className="px-8 py-4 bg-primary-1 text-white text-sm md:text-[16px] font-medium rounded-md hover:bg-primary-1">
                            Verify
                        </button>
                    </div>

                    {/* countdown */}
                    <div className="flex items-center font-medium text-600 mb-6">
                        <Clock size={20} className="mr-2" />
                        <span>{formatTime(timeLeft)}</span>
                    </div>

                    {/* resend options */}
                    <p className="text-sm text-700 mb-2 font-medium ">Didn't receive the code? Resend via :</p>
                    <div className="flex gap-3">
                        <button
                            disabled={timeLeft < 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md border font-semibold text-sm md:text-[16px] 
              ${timeLeft < 0 ? 'text-gray-400 border-gray-300' : 'text-white bg-primary-1 border-primary-1 hover:bg-primary-1'}`}
                        >
                            <Envelope size={20} /> Email
                        </button>
                        <button
                            disabled={timeLeft < 0}
                            className={`flex items-center gap-2 px-4 py-2 rounded-md border font-semibold text-sm md:text-[16px] 
              ${timeLeft < 0 ? 'text-gray-400 border-gray-300' : 'text-primary-1 border-primary-1 hover:bg-primary-1 hover:text-white'}`}
                        >
                            <ChatText size={20} /> SMS
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VerificationSms;
