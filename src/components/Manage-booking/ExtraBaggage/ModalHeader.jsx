import { CaretLeft, X } from '@phosphor-icons/react/dist/ssr';
import React from 'react'
import LegTabs from './LegTabs';

const ModalHeader = ({ onClose, legs, activeLeg, setActiveLeg }) => {
    return (
        <>
            {/* Desktop header */}
            <div className="hidden md:block p-6  ">
                <div className="flex items-start justify-between">
                    <div className='w-full max-w-6xl mx-auto'>
                        <h2 className="text-[28px] font-semibold text-800">
                            Select additional baggage
                        </h2>
                        <p className="text-sm text-600">
                            Avoid higher airport fees and long queues — secure your baggage
                            online in just a few clicks.
                        </p>
                    </div>
                    {/* <button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button> */}
                </div>
                <LegTabs legs={legs} activeId={activeLeg} onChange={setActiveLeg} />
            </div>

            {/* Mobile header (fixed) */}
            <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white md:shadow-sm p-4">
                <div className="flex items-center gap-3">
                    <button onClick={onClose} aria-label="Back" className="p-1">
                        <CaretLeft size={24} />
                    </button>
                    <div>
                        <h2 className="text-[18px] font-semibold text-800 text-center">
                            Select additional baggage
                        </h2>
                        <p className="text-sm text-600 text-center">
                            Avoid higher airport fees and long queues — secure your baggage
                            online in just a few clicks.
                        </p>
                    </div>
                </div>
                <LegTabs legs={legs} activeId={activeLeg} onChange={setActiveLeg} />
            </div>
        </>
    );
};

export default ModalHeader