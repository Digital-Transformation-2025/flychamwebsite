import { CheckCircle } from '@phosphor-icons/react/dist/ssr';
import React from 'react'

const VerificationSuccess = () => {
  return (
    <div className="space-y-2">
      {/* success pill */}
      <div
        role="status"
        className="inline-flex w-full items-center max-w-xs gap-2 rounded-sm border border-[#12792C] bg-[#34C759]/10 px-3 py-2  text-[#12792C]"
      >
        <CheckCircle size={20} weight="regular" className="shrink-0" />
        <span className="text-md text-sm  font-medium">Payment Method Verified!</span>
      </div>

      {/* helper line */}
      <p className="text-xs font-medium text-primary-1">
        Your refund will be processed to this card.
      </p>
    </div>
  );
}

export default VerificationSuccess