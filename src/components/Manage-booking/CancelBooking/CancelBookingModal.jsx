'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import PolicyCard from './PolicyCard';
import VerificationRequestCard from './VerificationRequestCard';
import VerificationCodeCard from './VerificationCodeCard';
import TopChrome from './TopChrome';
import MutedButton from './MutedButton';

/* =========================
   Full-page Modal (responsive)
========================= */
export default function CancelBookingModal({
    open,
    onClose,
    bookingRef = 'NHG7Y0',
    maskedPhone = '*8066',
}) {
    if (!open) return null;

    // stage: "request" (before sending) → "verify" (after clicking Send the code)
    const [stage, setStage] = useState('request');
    const [code, setCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes

    // start / reset timer when stage switches to verify
    useEffect(() => {
        if (stage !== 'verify') return;
        setTimeLeft(180);
        const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
        return () => clearInterval(t);
    }, [stage]);

    const mmss = useMemo(() => {
        const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
        const s = (timeLeft % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }, [timeLeft]);

    const handleSendCode = () => setStage('verify');
    const handleResend = () => setTimeLeft(180);
    const handleVerify = () => onClose?.();

    const handleClickBack = () => {
        if (stage === 'request') {
            onClose()
        } else {
            setStage('request')
        }
    }

    return (
        <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
            {/* <TopChrome onClose={onClose} /> */}

            <main className="w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 pb-24 sm:pb-20">
                <PageHeader bookingRef={bookingRef} />
                <PolicyCard />

                {stage === 'request' ? (
                    <VerificationRequestCard maskedPhone={maskedPhone} onSend={handleSendCode} />
                ) : (
                    <VerificationCodeCard
                        code={code}
                        setCode={setCode}
                        timeLeftLabel={mmss}
                        onEmailResend={() => handleResend()}
                        onSmsResend={() => handleResend()}
                        onVerify={handleVerify}
                    />
                )}
                <div className="my-4">

                    <MutedButton onClick={handleClickBack} className="!border-[#054E72] text-primary-1">
                        {stage === 'request' ? 'Cancel' : 'Back'}

                    </MutedButton>
                </div>

            </main>
        </div>
    );
}

