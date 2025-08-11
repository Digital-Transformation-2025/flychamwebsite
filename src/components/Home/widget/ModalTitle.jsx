import Divider from '@/components/FlightResults/FlighSelectStep/Divider'
import React from 'react'

const ModalTitle = () => {
    return (
        <>
            <div className=" my-2 flex items-center justify-between w-full  py-1 rounded-t-lg">
                <h2 className="text-lg font-bold text-gray-800">Modify search</h2>
                <button
                    // onClick={handleClose} // ⬅️ your close handler
                    className="text-gray-500 hover:text-gray-700"
                >
                    ✕
                </button>
            </div>
            <Divider />
        </>
    )
}

export default ModalTitle