import React from 'react'
const Money = ({ children }) => (
    <span className="text-[18px] md:text-[24px] font-medium text-700">{children}</span>
);
const ModalFooter = ({ total, onCancel, onContinue }) => {
    const ContinueBtn = ({ full }) => (
        <button
            onClick={onContinue}
            className={`${full ? "w-full py-3" : "px-6 py-4"}
            text-sm md:text-[16px] justify-self-end
            rounded-md bg-secondary-1 text-[#3D3B35] font-semibold hover:bg-[#A89565] transition`}
        >
            Continue to next flight
        </button>
    );

    return (
        <div className="border-t border-[#EAEAE8] bg-[#F7F7F6] px-4 py-8">
            {/* desktop */}
            <div className="hidden md:flex items-center justify-end ">


                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <p className={`text-sm  md:text-[20px] text-700 `}>Total for all passengers</p>
                        <Money>USD {total.toFixed(2)}</Money>
                    </div>
                    <ContinueBtn />
                </div>
            </div>

            {/* mobile */}
            <div className="md:hidden flex flex-col gap-3 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                    <p className={`text-sm  md:text-[20px] text-700 `}>Total for all passengers</p>

                    <span className="text-[14px] font-semibold text-700">
                        USD {total.toFixed(2)}
                    </span>
                </div>
                <ContinueBtn full />
                <button onClick={onCancel} className="text-primary-1 text-sm">
                    Cancel
                </button>
            </div>
        </div>
    );
};
export default ModalFooter