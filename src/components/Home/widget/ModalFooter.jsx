import Divider from '@/components/FlightResults/FlighSelectStep/Divider'
import CustomCheckbox from '@/components/Ui/CustomCheckbox'
import React from 'react'

const ModalFooter = ({ values, setFieldValue }) => {
    return (
        <>
            <Divider/>
            <div className="flex items-center justify-between my-4">
                <CustomCheckbox
                    checked={values.nearby}
                    onChange={() => setFieldValue("nearby", !values.nearby)}
                    label="Include nearby airports"
                />
                <button
                    onClick={() => {
                        // if (activeTab === 3) return isMobile ? onClose?.() : handleSubmit?.();
                        // if (activeTab === 2) handleStep?.("next");
                    }}

                    // disabled={isNextDisabled()}
                    className={`cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-opacity duration-200  bg-[#B59C6D] text-white hover:opacity-90 `}

                >
                    Search flights
                </button>
            </div>
        </>
    )
}

export default ModalFooter