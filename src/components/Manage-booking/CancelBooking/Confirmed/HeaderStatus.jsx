import useIsMobile from '@/hooks/useIsMobile';
import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const HeaderStatus = () => {
    const isMobile = useIsMobile()
    return (
        <div className="text-center my-8">
            <CheckCircle size={isMobile ? 44: 136} className="mx-auto  text-[#34A853]" weight="fill" />
            <h2 className="text-2xl md:text-4xl  font-semibold text-primary-1 mt-4">Cancellation Submitted</h2>
            <p className="text-gray-600 text-lg md:text-2xl mt-1">
                Your reservation has been canceled successfully
            </p>
        </div>
    )
}

export default HeaderStatus