import React from 'react'

const ModalTitle = () => {
    return (
        <div className=" my-2 flex items-center justify-between w-full border-b border-gray-200  py-2 rounded-t-lg">
            <h2 className="text-sm font-medium text-gray-800">Modify search</h2>
            <button
                // onClick={handleClose} // ⬅️ your close handler
                className="text-gray-500 hover:text-gray-700"
            >
                ✕
            </button>
        </div>
    )
}

export default ModalTitle