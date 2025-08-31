import React from 'react'
import PrimaryButton from './Info/PrimaryButton'
import { CaretLeft, CaretRight } from '@phosphor-icons/react/dist/ssr';

const CancelFooter = ({ handleClickBack, currentStep, handleClickButton, values }) => {
    const { cancelReason, isVerified, underStandCheck } = values

    const getNextBtnLabel = () => {
        switch (currentStep) {
            case 0:
                return 'I agree';
            case 1:
                return 'Next';
            case 2:
                return 'Submit Cancelation';
            case 3:
                return 'View Status';
            case 4:
                return 'Back to manage booking'
            default:
                return null;
        }
    }
    const isNextDisabled = () => {
        switch (currentStep) {
            case 0:
            case 3:
            case 4:
                return false;
            case 1:
                return false;
            case 2:
                return (isVerified && !underStandCheck);
            default:
                return null;
        }
    }

    return (

        <div className={
            `w-full max-w-7xl mx-auto h-[130px]
                     px-4 py-4 sm:px-5 md:px-6  md:py-4
                     bg-100 md:!bg-white
                     flex flex-col  items-center gap-3 ${currentStep === 0 ? 'justify-start md:flex-row-reverse' : ' justify-between md:flex-row-reverse'} ${currentStep === 4 && '!justify-center'}  md:border-0`
        }>
            <button
                onClick={handleClickButton}
                disabled={isNextDisabled()}
                className={`inline-flex items-center justify-center  rounded 
                    text-sm md:text:lg font-semibold
                     ${isNextDisabled() ? 'bg-300 text-500' : 'bg-secondary-1   text-btn group'} 
                    hover:opacity-95  ${`
                      px-10 py-3 w-full md:w-auto`}`}
            >
                {getNextBtnLabel()}
                {currentStep !== 4 &&
                    <CaretRight
                        size={20}
                        weight="regular"
                        className="transform transition-transform duration-200 group-hover:translate-x-1"
                    />

                }
            </button>
            {/* {currentStep === 6 &&
                <div className=' px-10 py-3'>
                </div>
            } */}
            {currentStep !== 4 &&
                <button
                    onClick={handleClickBack}
                    className={
                        `group inline-flex
                 items-center justify-center gap-2 transition-all duration-200
                border-0 md:border md:border-[#054E72] rounded text-sm md:text:lg
                text-600 md:!text-[#054E72]
                px-10 py-3 w-full md:w-auto`
                    }
                >
                    <CaretLeft
                        size={20}
                        weight="regular"
                        className="transform transition-transform duration-200 group-hover:-translate-x-1"
                        color='#054E72'
                    />
                    <span className='text-primary-1 font-medium'>
                        {(currentStep === 0) ? 'Cancel' : 'Back'}                    </span>


                </button>

            }

        </div>
    )
}

export default CancelFooter