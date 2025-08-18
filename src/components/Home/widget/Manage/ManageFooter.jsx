import { Info } from '@phosphor-icons/react/dist/ssr'
import React from 'react'
import { useSelector } from 'react-redux'

const ManageFooter = ({ canSearch }) => {
    const { isLoading } = useSelector((s) => s.manageBook)

    return (
        <div className="mt-4 flex items-center justify-between">
            <button
                type="button"
                className="flex items-center gap-2 text-[13px] text-primary-1"
                onClick={() =>
                    alert("Show 'can't find my Reservation number' help")
                }
            >
                <Info size={16} />
                I can’t find my Reservation number
            </button>

            <button
                type="submit"
                disabled={!canSearch || isLoading}
                className={`px-6 py-2 rounded-md text-sm font-medium transition 
                    ${(!canSearch || !isLoading)
                        ? "bg-secondary-1 text-white hover:opacity-90"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
            >
                {isLoading ? 'Searching ...' : 'Search'}
            </button>

        </div>
    )
}

export default ManageFooter