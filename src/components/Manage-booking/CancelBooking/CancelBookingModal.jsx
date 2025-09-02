'use client';
import React, { useEffect, useMemo, useState } from 'react';
import PageHeader from './PageHeader';
import CancelHeader from './CancelHeader';
import Button from '@/components/Ui/Button';
import MutedButton from './Info/MutedButton';
import PrimaryButton from './Info/PrimaryButton';
import Step from './Step';
import CancelFooter from './CancelFooter';
import StepOne from './StepOne/StepOne';
import { useFormik } from 'formik';
import StepTwo from './StepTwo/StepTwo';
import StepThree from './StepThree/StepThree';
import StepFour from './StepFour/StepFour';
import ConfirmCancelBookingModal from './ConfirmCancelBookingModal';
import CancellationConfirmed from './Confirmed/Confirmed';
import RefundStatus from './RefundStatus/RefundStatus';
import PolicyCard from './Info/PolicyCard';
import { useDispatch } from 'react-redux';
import { verifyCardService } from '@/store/Services/manageBookingServices';

/* =========================
   Full-page Modal (responsive)
========================= */
export default function CancelBookingModal({
    open,
    onClose, sessionId
}) {
    if (!open) return null;

    const dispatch = useDispatch()
    const [currentStep, setcurrentStep] = useState(0)
    const [isOpen, setIsOpen] = useState(false);






    const handleClickBack = () => {
        switch (currentStep) {
            case 0:
            case 5:
            case 6:
                return onClose();
            case 1:
            case 2:
            case 3:
            case 4:
                return setcurrentStep(prev => prev - 1);
        }

    }

    const handleClickButton = () => {
        switch (currentStep) {
            case 0:
            case 1:
                return setcurrentStep(prev => prev + 1);
            case 2:
                return setIsOpen(true);
            case 3:
                return setcurrentStep(prev => prev + 1);
            case 4:
                return onClose();
        }
    }
    const [isSubmitted, setIsSubmitted] = useState(false)
    const formik = useFormik({
        initialValues: {
            cancelReason: '',
            underStandCheck: false,
            isVerified: null,
            code: '',
            last4: ''
        },
        onSubmit: (values) => {
            const { last4 } = values
            const data = {
                // SessionId: sessionId,
                SessionId: 'Ng9V9g2WHfJtQxQPt28Es+eVGdft1h1DAqkRjM5ncoyhduR61AIro24A37Yaram6',
                last4
            }

            dispatch(verifyCardService(data))
                .then((action) => {
                    if (verifyCardService.fulfilled.match(action)) {
                        formik.setFieldValue('isVerified', action.payload.result)
                        setIsSubmitted(true)
                    }
                })
        },
    });



    let steps = <>
        <div className="sticky top-0 z-10 bg-white md:static md:top-auto md:z-auto">
            <CancelHeader />
            <main className=" overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-5 md:px-6 ">
                <PageHeader />
                {(currentStep !== 0) &&
                    <Step currentStep={currentStep} />
                }
            </main>
        </div>


        <main className=" overflow-y-auto w-full max-w-7xl mx-auto px-4 flex-1 ">
            {currentStep === 0 &&
                <PolicyCard />
            }
            {/* {currentStep === 1 &&
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
            } */}
            {/* Checks */}
            {currentStep === 1 &&
                <StepThree
                    setFieldValue={formik.setFieldValue}
                    errors={formik.errors}
                    touched={formik.touched}
                    values={formik.values}
                />
            }

            {/* Summary */}
            {currentStep === 2 &&
                <StepFour
                    setFieldValue={formik.setFieldValue}
                    errors={formik.errors}
                    touched={formik.touched}
                    values={formik.values}
                    handleSubmit={formik.handleSubmit}
                    isSubmitted={isSubmitted}

                />
            }
            {currentStep === 2 &&
                <span className='h-[1px] w-full bg-200 block'></span>
            }
        </main>
    </>

    const renderSteps = () => {
        switch (currentStep) {
            case 0:
            case 1:
            case 2:
                return steps;
            case 3:
                return (
                    <>
                        <CancelHeader />
                        <CancellationConfirmed />
                    </>
                );
            case 4:
                return (
                    <>
                        <RefundStatus />
                    </>
                );
            default:
                return null;
        }
    };


    return (
        <>

            <div className="fixed inset-0 z-[100] bg-white flex flex-col md:block min-h-screen  overflow-auto">
                {/* ✅ Header (fixed on mobile, normal on desktop) */}
                {/* <CancellationConfirmed /> */}
                {/* <RefundStatus /> */}



                {renderSteps()}
                <div className="sticky bottom-0 z-10 bg-white md:static md:bottom-auto md:z-auto">
                    <CancelFooter
                        handleClickButton={handleClickButton}
                        handleClickBack={handleClickBack}
                        currentStep={currentStep}
                        values={formik.values}
                    />
                </div>
            </div>
            <ConfirmCancelBookingModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onConfirm={() => {
                    setcurrentStep(3)
                    setIsOpen(false);
                }}
            />

        </>
    );
}

