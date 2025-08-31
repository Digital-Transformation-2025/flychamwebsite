import React from 'react'
import PassengerCard from './PassengerCard';
import OptionTile from './OptionTile';

const ModalBody = ({
    passengers,
    setMobileSheetOpen,
    activePassenger,
    setActivePassenger,
    clearForPassenger,
    selectedKg,
    selectedOption,
    setSelectedOption,
    options,
}) => {
    return (
        <div className="
        flex-1 overflow-y-auto md:overflow-visible
        p-4 md:p-6
        mt-[170px] mb-[150px] md:mt-0 md:mb-0
    ">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">

                {/* Left: Passengers */}
                <div className="bg-50 border border-[#F5F5F4] p-4 rounded-xl md:pr-2">
                    <div className="mb-3 flex items-center justify-between">
                        <span className="font-semibold">Passenger</span>
                        <button
                            onClick={clearForPassenger}
                            className="hidden md:inline-flex items-center gap-1 text-sm font-semibold text-alert"
                        >
                            Clear
                        </button>
                    </div>

                    <div className="space-y-3 md:max-h-[40vh] md:overflow-y-auto">
                        {passengers.map((p) => (
                            <PassengerCard
                                key={p.id}
                                passenger={p}
                                active={p.id === activePassenger}
                                onSelect={setActivePassenger}
                                onClear={clearForPassenger}
                                selectedKg={selectedKg}
                                onSelectClick={() => setMobileSheetOpen(true)}
                            />
                        ))}
                    </div>
                </div>

                {/* Right: Options */}
                <div className="hidden md:block h-fit border border-[#F5F5F4] bg-50 p-4 rounded-xl">
                    <div className="mb-3 font-semibold">Choose extra baggage</div>
                    <div className="grid grid-cols-2 gap-3">
                        {options.map((o) => (
                            <OptionTile
                                key={o.id}
                                option={o}
                                active={o.id === selectedOption}
                                onSelect={setSelectedOption}
                                disabled={
                                    passengers.find((p) => p.id === activePassenger)?.disabled
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalBody