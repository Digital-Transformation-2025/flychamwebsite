'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import CancelHeader from './CancelHeader';
import Button from '@/components/Ui/Button';
import MutedButton from './Info/MutedButton';
import PrimaryButton from './Info/PrimaryButton';
import Step from './Step';
import CancelFooter from './CancelFooter';
import Info from './Info/Info';
import StepOne from './StepOne/StepOne';
import { useFormik } from 'formik';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree';
import StepFour from './StepFour/StepFour';

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
    const [stage, setStage] = useState(1);
    const [code, setCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
    const [currentStep, setcurrentStep] = useState(0)

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
        currentStep > 1 ? setcurrentStep((prev) => prev - 1) : onClose()

    }

    const handleClickButton = () => {
        setcurrentStep(prev => prev + 1)
    }

    const formik = useFormik({
        initialValues: {
            bookingRef,
            maskedPhone,
            selectedFlights: [],
            selectedpassengers: [],
            cancelReason: {}
        },
        onSubmit: (values) => {
            console.log('Form submitted', values);
            // Handle form submission (e.g., cancel booking)
        },
    });
    const cancellationOptions = [
        { value: "Change of plans", label: "(Travel dates changed)" },
        { value: "Personal reasons", label: "(Family, work, or personal emergencies)" },
        { value: "Health reasons", label: "(Family, work, or personal emergencies)" },
        { value: "Flight delay or schedule change", label: "(Airline rescheduled the flight)" },
        { value: "Better fare available", label: "(Found a more convenient or cheaper option)" },
        { value: "Booking mistake", label: "(Wrong passenger name, wrong flight, or date)" },
        { value: "Other", label: "Other" },
    ];

    const flights = [
        { id: 1, from: 'Damascus (DAM)', to: 'Dubai (DXB)', date: 'Thu, 10 Jul 2025' },
        { id: 2, from: 'Dubai (DXB)', to: 'Damascus (DAM)', date: 'Thu, 31 Jul 2025' },
    ];
    const passengers = [
        { id: 1, name: 'wwww)', },
        { id: 2, name: 'dddd', },
    ];

    return (
        <>

            <div className="fixed inset-0 z-[100] bg-white flex flex-col md:block min-h-screen  overflow-auto">
                {/* ✅ Header (fixed on mobile, normal on desktop) */}

                <div className="sticky top-0 z-10 bg-white md:static md:top-auto md:z-auto">
                    <CancelHeader />
                    <main className=" overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 ">
                        <PageHeader bookingRef={bookingRef} />
                        {currentStep !== 0 &&
                            <Step currentStep={currentStep} />
                        }
                    </main>
                </div>

                {/* ✅ Scrollable content (only on mobile) */}
                <main className=" overflow-y-auto w-full max-w-7xl mx-auto px-4 flex-1 ">
                    {currentStep === 0 &&
                        <Info />
                    }
                    {currentStep === 1 &&
                        <StepOne
                            flights={flights}
                            setFieldValue={formik.setFieldValue}
                            errors={formik.errors}
                            touched={formik.touched}
                            values={formik.values}
                        />
                    }
                    {currentStep === 2 &&
                        <StepTwo
                            passengers={passengers}
                            setFieldValue={formik.setFieldValue}
                            errors={formik.errors}
                            touched={formik.touched}
                            values={formik.values}
                        />
                    }
                    {currentStep === 3 &&
                        <StepThree
                            cancellationOptions={cancellationOptions}
                            setFieldValue={formik.setFieldValue}
                            errors={formik.errors}
                            touched={formik.touched}
                            values={formik.values}
                        />
                    }
                    {currentStep === 4 &&
                        <StepFour
                            cancellationOptions={cancellationOptions}
                            setFieldValue={formik.setFieldValue}
                            errors={formik.errors}
                            touched={formik.touched}
                            values={formik.values}
                        />
                    }

                </main>

                {/* ✅ Footer (fixed on mobile, normal on desktop) */}
                <div className="sticky bottom-0 z-10 bg-white md:static md:bottom-auto md:z-auto">
                    <CancelFooter
                        handleClickButton={handleClickButton}
                        handleClickBack={handleClickBack}
                        currentStep={currentStep}
                    />
                </div>
            </div>

        </>
    );
}

