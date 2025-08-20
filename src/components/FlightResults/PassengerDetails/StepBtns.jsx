'use client'
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { useSelector } from 'react-redux';

const StepBtns = ({ activeStep, setActiveStep, handleSubmit }) => {

    const { isLoadingCreatePassengers, isLoadingCreatePayment } = useSelector((s) => s.flights)
    const isLoading = isLoadingCreatePassengers || isLoadingCreatePayment
    // const isLoading = true

    return (
        <div className={`flex flex-col-reverse gap-3 md:flex-row justify-between items-center w-full my-8  ${activeStep === 2 && " max-w-xl"}`}>
            {/* Back to flights */}
            <button
                onClick={() => {
                    setActiveStep((prev) => prev - 1)
                }}
                className="group w-full md:w-auto px-6 py-3 border border-[var(--primary-1)] text-[var(--primary-1)] hover:bg-[var(--primary-1)] hover:text-white font-semibold rounded-md inline-flex items-center justify-center gap-2 transition-all duration-200"

            >
                <CaretLeft
                    size={20}
                    weight="regular"
                    className="transform transition-transform duration-200 group-hover:-translate-x-1"
                />  Back to flights
            </button>

            {/* Select seats & extras */}
            <button
                disabled={isLoading}
                onClick={handleSubmit}
                className={`transition font-medium rounded-md
    ${isLoading
                        ? 'w-full md:w-auto px-6 py-3 bg-gray-300 text-gray-500 cursor-not-allowed font-bold text-base sm:text-[16px] font-montserrat flex items-center justify-center gap-2'
                        : 'group w-full md:w-auto px-6 py-3 bg-[var(--secondary-1)] hover:bg-[#C2B48B] text-white font-bold text-base sm:text-[16px] font-montserrat flex items-center justify-center gap-2'
                    }`}
            >
                <>
                    {activeStep === 1 ? isLoading ? "Processing..." : 'Next' : isLoading ? "Processing..." : 'Go to pay'}
                    {!isLoading &&
                        <CaretRight
                            size={20}
                            weight="regular"
                            className="transform transition-transform duration-200 group-hover:translate-x-1"
                        />
                    }
                </>
            </button>


        </div>
    );
};

export default StepBtns;
