import React from 'react'
import PrimaryButton from './Info/PrimaryButton'

const CancelFooter = ({ handleClickBack, currentStep, handleClickButton }) => {
    return (

        <div className={
            `w-full max-w-7xl mx-auto
                     px-4 py-4 sm:px-5 md:px-6  md:py-4
                     bg-100 md:!bg-white
                     flex flex-col  items-center gap-3 ${currentStep === 0 ? 'justify-end md:flex-row' : ' justify-between md:flex-row-reverse'}  md:border-0`
        }>
            <button
                onClick={handleClickButton}

                className={`inline-flex items-center justify-center  rounded 
                     text-white text-sm md:text:lg font-semibold bg-secondary-1 hover:opacity-95  ${`
                      px-10 py-3 w-full md:w-auto`}`}
            >
                {currentStep === 0 ? 'I agree' : 'Next'}

            </button>
            <button
                onClick={handleClickBack}
                className={
                    `
                      border-0 md:border md:border-[#054E72] rounded text-sm md:text:lg
                            text-600 md:!text-[#054E72]
                              px-10 py-3 w-full md:w-auto`
                }
            >
                {currentStep === 0 ? 'Cancel' : 'Back'}

            </button>


        </div>
    )
}

export default CancelFooter