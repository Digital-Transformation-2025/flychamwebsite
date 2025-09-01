import Divider from '@/components/FlightResults/FlighSelectStep/Divider'
import CustomCheckbox from '@/components/Ui/CustomCheckbox'
import React from 'react'
import { useSelector } from 'react-redux'

const ModalFooter = ({ values, setFieldValue, handleSubmit }) => {
    const { isLoadingFlights } = useSelector((s) => s.flights)
    const { dateStart, source, destination, tripType, dateEnd } = values
    const isDisabled = !dateStart || !source || !destination || (tripType === "Return" && !dateEnd);
    // const isDisabled =true
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
                    type="submit"
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     handleSubmit();
                    // }}
                    disabled={isDisabled}
                    className=
                    {
                        `cursor-pointer px-8 py-4 rounded-md text-[16px] font-medium transition-opacity duration-200  
                      ${isDisabled
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-[#BAA981] text-white cursor-pointer hover:bg-[#a89773]'
                        }
                    `
                    }
                >
                    Search flights
                </button>

            </div>
        </>
    )
}

export default ModalFooter