import { Info } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import { useSelector } from 'react-redux'

const ManageFooter = ({ canSearch }) => {
    const { isLoading } = useSelector((s) => s.manageBook)

    return (
        <div className="mt-4 flex items-center justify-between">
            {/* Tooltip wrapper */}
            <div className="relative group">
                <button
                    type="button"
                    className="flex items-center gap-2 text-[13px] text-primary-1"
                >
                    <Info size={16} />
                    I can’t find my Reservation number
                </button>

                {/* Tooltip box */}
                <div className="absolute top-[100%]  mt-2 mb-2 left-0 w-64 rounded-md bg-gray-600 text-white text-xs px-3 py-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2px] transition-all duration-200 pointer-events-none shadow-lg">
                    A 6-character reservation code found in your confirmation email or receipt
                </div>
            </div>

            <button
                type="submit"
                disabled={!canSearch || isLoading}
                className={`px-6 py-2 rounded-md text-sm font-medium transition 
          ${(!canSearch || isLoading)
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-secondary-1 text-white hover:opacity-90"
                    }`}
            >
                {isLoading ? 'Searching ...' : 'Search'}
            </button>
        </div>
    )
}

export default ManageFooter
