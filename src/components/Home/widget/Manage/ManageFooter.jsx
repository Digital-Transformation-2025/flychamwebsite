import { Info } from '@phosphor-icons/react/dist/ssr'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const ManageFooter = ({ canSearch }) => {
    const { isLoading } = useSelector((s) => s.manageBook)
    const [isMobile, setIsMobile] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    return (
        <div className="mt-6 flex flex-col-reverse md:flex-row gap-3 md:gap-0  items-center justify-between">
            {/* Tooltip wrapper */}
            <div className="relative group w-full ">
                <button
                    type="button"
                    onClick={() => isMobile && setShowTooltip((prev) => !prev)}
                    className="flex  items-center !self-start gap-2 text-[13px] text-primary-1"
                >
                    <Info size={16} />
                    I can’t find my Reservation number
                </button>

                {/* Tooltip */}
                <div
                    className={`absolute top-[100%] mt-2 mb-2 left-0 w-64 rounded-md bg-gray-600 text-white text-xs px-3 py-2 shadow-lg transition-all duration-200
      ${isMobile ? (showTooltip ? "opacity-100" : "opacity-0 pointer-events-none")
                            : "opacity-0 group-hover:opacity-100 group-hover:translate-y-[-2px] pointer-events-none"}`}
                >
                    A 6-character reservation code found in your confirmation email or receipt
                </div>
            </div>


            <button
                type="submit"
                disabled={!canSearch || isLoading}
                className={`px-8 py-4 w-full text-nowrap md:w-auto rounded-md text-sm font-medium transition 
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
