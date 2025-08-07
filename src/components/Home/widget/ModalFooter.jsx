import Divider from '@/components/FlightResults/FlighSelectStep/Divider'
import CustomCheckbox from '@/components/Ui/CustomCheckbox'
import React from 'react'

const ModalFooter = ({ values, setFieldValue, handleSubmit }) => {
    return (
        <>
            <Divider />
            <div className="flex items-center justify-between my-4">
                <CustomCheckbox
                    checked={values.nearby}
                    onChange={() => setFieldValue("nearby", !values.nearby)}
                    label="Include nearby airports"
                />
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="cursor-pointer px-6 py-2 rounded-md text-sm font-medium transition-opacity duration-200 bg-secondary text-white hover:opacity-90"
                >
                    Search flights
                </button>

            </div>
        </>
    )
}

export default ModalFooter