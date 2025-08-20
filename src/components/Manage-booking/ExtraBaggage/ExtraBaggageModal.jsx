'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    X,
    CaretLeft,
    UserCircle,
    Suitcase,
    CheckCircle,
    TrashSimple,
    Info,
    Trash,
    User,
    SuitcaseRolling,
} from '@phosphor-icons/react/dist/ssr';

/* =========================
   Small UI atoms
========================= */
const SectionLabel = ({ children }) => (
    <div className="text-[16px] md:text-[18px] font-medium text-800">{children}</div>
);


const Money = ({ children }) => (
    <span className="text-[18px] md:text-[24px] font-medium text-700">{children}</span>
);

/* =========================
   Leg Tabs
========================= */
const LegTabs = ({ legs, activeId, onChange }) => {
    const containerRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ id: 'out', label: 'DAM → DXB' });

    useEffect(() => {
        const activeBtn = containerRef.current?.querySelector(
            `[data-id="${activeId}"]`
        );
        if (activeBtn) {
            const rect = activeBtn.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            setIndicatorStyle({
                width: rect.width,
                left: rect.left - containerRect.left,
            });
        }
    }, [activeId, legs]);

    return (
        <div className="mt-3 border-b border-[#EAEAE8] ">
            <div
                ref={containerRef}
                className="relative flex gap-8 justify-center md:justify-start"
            >
                {legs.map((leg) => {
                    const active = leg.id === activeId;
                    return (
                        <button
                            key={leg.id}
                            type="button"
                            data-id={leg.id}
                            onClick={() => onChange(leg.id)}
                            className={`relative py-3 text-[16px] md:text-[20px] w-[221px] font-semibold transition-colors ${active ? "text-primary-1" : "text-500"
                                }`}
                        >
                            {leg.label}
                        </button>
                    );
                })}

                {/* Animated underline indicator */}
                <span
                    className="absolute -bottom-[1px] h-[3px] bg-primary-1 rounded-full transition-all duration-300"
                    style={{
                        width: indicatorStyle.width,
                        left: indicatorStyle.left,
                    }}
                />
            </div>
        </div>
    );
};

/* =========================
   Passenger cards
========================= */
const PassengerChip = ({ show, selectedKg }) => {
    if (!show || !selectedKg) return null;
    return (
        <span className="inline-flex items-center gap-1   text-sm md:text-[15px] font-medium">
            <span className="text-700">+{selectedKg}kg</span>
            <CheckCircle size={20} weight="fill" color="#22C55E" />
        </span>
    );
};

const PassengerNameRow = ({ name, type, chip }) => (
    <div className="flex w-full items-center justify-between">
        <div className="leading-none">
            <span className="text-[14px] md:text-[14px] font-semibold text-primary-1">
                {name}
            </span>
            <span className="mx-2 text-700 text-[13px] font-normal">({type})</span>
        </div>
        {chip}
    </div>
);

const PassengerBaggageLines = ({ handKg = 7, checkedKg = 30, hand, checked }) => (
    <div className="mt-2 space-y-1">
        <>
            <p className="text-[12px]">
                <span className="font-medium text-700">{handKg} kg</span>
                <span className="text-500"> hand baggage</span>
            </p>
            <p className="text-[12px] text-500">
                <span className="font-medium text-700">{checkedKg} kg</span> Checked baggage
            </p>
        </>
    </div>
);

const PassengerNote = ({ note }) =>
    note ? (
        <div className="mt-3 flex items-start gap-2 text-primary-1">
            <span className="mt-[2px]">
                <Info size={16} />
            </span>
            <span className="text-[12px]">{note}</span>
        </div>
    ) : null;

const PassengerCard = ({
    passenger,
    active,
    onSelect,
    selectedKg,
    onClear,
    onSelectClick
}) => {
    const disabled = passenger.disabled;

    return (
        <button
            type="button"
            onClick={() => !disabled && onSelect?.(passenger.id)}
            className={[
                'w-full rounded-lg border-2  p-6 text-start transition',
                active
                    ? 'border-[#054E72]'
                    : 'border-[#E5E5E3]',
                disabled ? 'opacity-60 cursor-not-allowed' : ' hover:bg-[#FAFAF9]',
            ].join(' ')}
        >
            <div className="flex items-start gap-2 w-full">
                <User size={20} className="text-primary-1 mt-[2px]" />

                <div className="flex-1">
                    <PassengerNameRow
                        name={passenger.name}
                        type={passenger.type}
                        chip={<PassengerChip show={active} selectedKg={selectedKg} />}
                    />

                    <PassengerBaggageLines
                        handKg={passenger.handKg}
                        checkedKg={passenger.checkedKg}
                        hand={passenger.hand}
                        checked={passenger.checked}
                    />
                    {passenger.type !== 'Infant' &&
                        <p
                            onClick={onSelectClick}
                            className='text-[12px] font-semibold text-primary-1 underline w-full  flex md:hidden justify-end cursor-pointer '>Select</p>
                    }
                    {/* <div className="mt-3 h-px w-full bg-[#EAEAE8]" /> */}
                </div>
            </div>

            <PassengerNote note={passenger.note} />
        </button>
    );
};
/* =========================
   Baggage option tiles
========================= */
const OptionTile = ({ option, active, onSelect, disabled }) => {
    return (
        <button
            disabled={disabled}
            onClick={() => onSelect(option.id)}
            className={`relative w-full rounded-lg border-1 p-5 text-center transition ${active ? 'border-[#054E72] bg-[#054e7229]  ' : 'border-[#EAEAE8]'
                } ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FAFAF9]'}`}
        >
            <SuitcaseRolling size={28}
                color={active ? '#054E72' : '#5F5F5C'}
                weight='fill'
                className="mx-auto "
            />

            <div className={`mt-2 text-[14px] font-semibold ${active ? 'text-primary-1 font-semibold' : 'text-500 font-medium'}`}>
                +{option.kg}kg
            </div>
            <div className={`text-[12px] ${active ? 'text-primary-1 font-semibold' : 'text-500 font-medium'}`}>${option.price.toFixed(2)}</div>

            {active ? (
                <CheckCircle
                    weight="fill"
                    size={27}
                    className="absolute right-2 top-2"
                    color='#22C55E'
                />
            ) : (
                <span className="absolute right-2 top-2 h-[14px] w-[14px] rounded-full border border-[#D6D6D3]" />
            )}
        </button>
    );
};

/* =========================
   Header (responsive)
========================= */
const ModalHeader = ({ onClose, legs, activeLeg, setActiveLeg }) => {
    return (
        <>
            {/* Desktop header */}
            <div className="hidden md:block p-6  ">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-[28px] font-semibold text-800">
                            Select additional baggage
                        </h2>
                        <p className="text-sm text-600">
                            Avoid higher airport fees and long queues — secure your baggage
                            online in just a few clicks.
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded hover:bg-gray-100"
                        aria-label="Close"
                    >
                        <X size={16} />
                    </button>
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

/* =========================
   Footer (responsive)
========================= */
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
        <div className="border-t border-[#EAEAE8] bg-[#F7F7F6] px-4 py-4">
            {/* desktop */}
            <div className="hidden md:flex items-center justify-end max-w-5xl mx-auto">


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

const MobileOptionsSheet = ({
    open,
    onClose,
    options,
    selectedId,
    onSelect,
    disabled,
}) => {
    if (!open) return null;

    return (
        <div className="md:hidden fixed inset-0 z-[120]">
            {/* dim background */}
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            {/* sheet */}
            <div className="absolute inset-x-0 bottom-0 max-h-[70vh] rounded-t-2xl bg-white p-4 shadow-[0_-12px_30px_rgba(0,0,0,0.18)] animate-sheet-up">
                <div className="flex items-center justify-between mb-2">
                    <SectionLabel>Chose extra baggage</SectionLabel>
                    <button onClick={onClose} className="p-2 -mr-2" aria-label="Close">
                        <X size={16} />
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3 overflow-y-auto pr-1" style={{ maxHeight: '58vh' }}>
                    {options.map((o) => (
                        <OptionTile
                            key={o.id}
                            option={o}
                            active={o.id === selectedId}
                            onSelect={(id) => {
                                onSelect(id);
                                // onClose();
                            }}
                            disabled={disabled}
                        />
                    ))}
                </div>
            </div>

            {/* inline keyframes for the slide-up */}
            <style jsx>{`
        @keyframes sheet-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        .animate-sheet-up { animation: sheet-up 1000ms  }
      `}</style>
        </div>
    );
};
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


/* =========================
   Main Modal
========================= */
const ExtraBaggageModal = ({
    open,
    onClose,
    legs: legsProp,
    passengers: passengersProp,
    options: optionsProp,
}) => {
    if (!open) return null;

    const legs =
        legsProp ||
        [
            { id: 'out', label: 'DAM → DXB' },
            { id: 'ret', label: 'DXB → DAM' },
        ];

    const passengers =
        passengersProp ||
        [
            {
                id: 'p1',
                name: 'MR. Mouayad Hawari',
                type: 'Adult',
                hand: '7 kg hand baggage',
                checked: '30 kg Checked baggage',
            },
            {
                id: 'p2',
                name: 'Mstr. Maged Saati',
                type: 'Child',
                hand: '7 kg hand baggage',
                checked: '20 kg Checked baggage',
            },
            {
                id: 'p3',
                name: 'Mstr. Maged Saati',
                type: 'Child',
                hand: '7 kg hand baggage',
                checked: '20 kg Checked baggage',
            },
            {
                id: 'p4',
                name: 'Mstr. Maged Saati',
                type: 'Child',
                hand: '7 kg hand baggage',
                checked: '20 kg Checked baggage',
            },
            {
                id: 'p5',
                name: 'Mstr. Maged Saati',
                type: 'Infant',
                hand: '5 kg hand baggage',
                checked: '10 kg Checked baggage',
                note: "Extra baggage can't be added for an infant",
                disabled: true,
            },
            {
                id: 'p6',
                name: 'Mstr. Maged Saati',
                type: 'Infant',
                hand: '5 kg hand baggage',
                checked: '10 kg Checked baggage',
                note: "Extra baggage can't be added for an infant",
                disabled: true,
            },
            {
                id: 'p7',
                name: 'Mstr. Maged Saati',
                type: 'Infant',
                hand: '5 kg hand baggage',
                checked: '10 kg Checked baggage',
                note: "Extra baggage can't be added for an infant",
                disabled: true,
            },
        ];

    const options =
        optionsProp ||
        [
            { id: 'o5', kg: 5, price: 10 },
            { id: 'o10', kg: 10, price: 18 },
            { id: 'o15', kg: 15, price: 25 },
            { id: 'o20', kg: 20, price: 32 },
        ];

    const [activeLeg, setActiveLeg] = useState(legs[0].id);
    const [activePassenger, setActivePassenger] = useState(passengers[0].id);
    const [selectedOption, setSelectedOption] = useState(options[0].id);
    const [applyEntireTrip, setApplyEntireTrip] = useState(false);
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
    const selectedKg = useMemo(
        () => options.find((o) => o.id === selectedOption)?.kg,
        [options, selectedOption]
    );
    const selectedPrice = useMemo(
        () => options.find((o) => o.id === selectedOption)?.price ?? 0,
        [options, selectedOption]
    );

    const total = useMemo(() => selectedPrice * 1, [selectedPrice]); // extend if per passenger

    const clearForPassenger = () => setSelectedOption(null);

    const onContinue = () => {
        // return payload to parent if needed
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100]"
        >
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
                aria-hidden
            />
            {/* panel */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="mx-auto  md:my-10 w-full max-w-[1100px] md:px-3">
                    <div className="md:rounded-xl bg-white md:shadow-[0_14px_40px_rgba(0,0,0,0.20)] h-[100vh] md:h-auto flex flex-col">
                        {/* Header */}
                        <ModalHeader
                            onClose={onClose}
                            legs={legs}
                            activeLeg={activeLeg}
                            setActiveLeg={setActiveLeg}
                        />

                        {/* Body */}
                        {/* <Divider /> */}
                        {/* Inside ExtraBaggageModal return */}
                        <ModalBody
                            passengers={passengers}
                            setMobileSheetOpen={setMobileSheetOpen}
                            activePassenger={activePassenger}
                            setActivePassenger={setActivePassenger}
                            clearForPassenger={clearForPassenger}
                            selectedKg={selectedKg}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            options={options}
                        />

                        {/* Footer */}
                        {/* Desktop footer (inside modal card) */}
                        <div
                            className="
    md:relative md:block
    fixed bottom-0 left-0 right-0 z-50 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)]
    md:shadow-none md:bg-transparent
  "
                        >
                            <ModalFooter total={total} onCancel={onClose} onContinue={onContinue} />
                        </div>

                    </div>
                </div>
            </div>
            <MobileOptionsSheet
                open={mobileSheetOpen}
                onClose={() => setMobileSheetOpen(false)}
                options={options}
                selectedId={selectedOption}
                onSelect={setSelectedOption}
                disabled={passengers.find((p) => p.id === activePassenger)?.disabled}
            />
        </div>
    );
};

export default ExtraBaggageModal;
