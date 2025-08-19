'use client';
import React, { useMemo, useState } from 'react';
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

const Subtle = ({ children, className = '' }) => (
    <p className={`text-sm text-600 ${className}`}>{children}</p>
);

const Chip = ({ children, tone = 'green' }) => (
    <span
        className={`inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[12px] font-semibold ${tone === 'green'
            ? 'bg-[#E8F6EE] text-[#1E874B]'
            : 'bg-[#FFF2F2] text-[#B00300]'
            }`}
    >
        {children}
    </span>
);

const Divider = () => <div className="h-px w-full bg-[#EAEAE8]" />;

const Money = ({ children }) => (
    <span className="text-[18px] font-semibold text-700">{children}</span>
);

/* =========================
   Leg Tabs
========================= */
const LegTabs = ({ legs, activeId, onChange }) => {
    return (
        <div className="mt-3 border-b border-[#EAEAE8]">
            <div className="flex gap-8">
                {legs.map((leg) => {
                    const active = leg.id === activeId;
                    return (
                        <button
                            key={leg.id}
                            type="button"
                            onClick={() => onChange(leg.id)}
                            className={`relative py-3 text-[16px] md:text-[20px] font-semibold transition-colors ${active ? 'text-primary-1' : 'text-500'
                                }`}
                        >
                            {leg.label}
                            <span
                                className={`absolute left-0 -bottom-[1px] h-[3px] rounded-full transition-all ${active ? 'w-full bg-primary-1' : 'w-0 bg-transparent'
                                    }`}
                            />
                        </button>
                    );
                })}
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
        <span className="inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-sm md:text-[16px] font-semibold">
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
    onClear, // optional – if you later add a clear action
}) => {
    const disabled = passenger.disabled;

    return (
        <button
            type="button"
            onClick={() => !disabled && onSelect?.(passenger.id)}
            className={[
                'w-full rounded-lg border-2  p-6 text-left transition',
                active
                    ? 'border-[#054E72]'
                    : 'border-[#E5E5E3]',
                disabled ? 'opacity-60 cursor-not-allowed' : 'hover:bg-[#FAFAF9]',
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
   Footer (responsive)
========================= */
const ModalFooter = ({ total, onCancel, onContinue }) => {
    const ContinueBtn = ({ full }) => (
        <button
            onClick={onContinue}
            className={`${full ? "w-full py-3" : "px-6 py-4"} rounded-md bg-secondary-1 text-[#3D3B35] font-semibold hover:bg-[#A89565] transition`}
        >
            Continue to next flight
        </button>
    );

    return (
        <div className="border-t border-[#EAEAE8] bg-[#F7F7F6] px-4 py-4">
            {/* desktop */}
            <div className="hidden md:flex items-center justify-between max-w-5xl mx-auto">
                <button
                    onClick={onCancel}
                    className="px-6 py-4 rounded-md border border-primary-1 text-primary-1 hover:bg-[#F3F6F7] transition"
                >
                    Cancel
                </button>

                <div className="flex items-center gap-6">
                    <div className="text-right">
                        <Subtle>Total for all passengers</Subtle>
                        <Money>USD {total.toFixed(2)}</Money>
                    </div>
                    <ContinueBtn />
                </div>
            </div>

            {/* mobile */}
            <div className="md:hidden flex flex-col gap-3 max-w-md mx-auto">
                <div className="flex items-center justify-between">
                    <Subtle>Total for all passengers</Subtle>
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
        <div className="fixed inset-0 z-[100]">
            {/* backdrop */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
                aria-hidden
            />
            {/* panel */}
            <div className="absolute inset-0 overflow-y-auto">
                <div className="mx-auto my-4 md:my-10 w-full max-w-[1100px] px-3">
                    <div className="rounded-xl bg-white shadow-[0_14px_40px_rgba(0,0,0,0.20)]">
                        {/* Header */}
                        <div className="p-4 md:p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    {/* mobile back */}
                                    <button
                                        onClick={onClose}
                                        className="md:hidden -ml-1 mr-1 p-1 rounded hover:bg-gray-100"
                                        aria-label="Back"
                                    >
                                        <CaretLeft size={18} />
                                    </button>
                                    <div>
                                        <h2 className="text-[18px] md:text-[24px] font-semibold text-primary-1">
                                            Select additional baggage
                                        </h2>
                                        <Subtle className="mt-1">
                                            Avoid higher airport fees and long queues — secure your
                                            baggage online in just a few clicks.
                                        </Subtle>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="hidden md:inline-flex p-2 rounded hover:bg-gray-100"
                                    aria-label="Close"
                                >
                                    <X size={16} />
                                </button>
                            </div>

                            {/* Leg tabs */}
                            <LegTabs legs={legs} activeId={activeLeg} onChange={setActiveLeg} />
                        </div>

                        {/* Body */}
                        {/* <Divider /> */}
                        <div className="p-4 md:p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: Passengers */}
                                <div>
                                    <div className="mb-3 flex items-center justify-between">
                                        <SectionLabel>Passenger</SectionLabel>
                                        <button
                                            onClick={clearForPassenger}
                                            className="hidden md:inline-flex items-center gap-1 text-[12px] md:text-[14px] font-semibold text-alert hover:opacity-80"
                                        >
                                            <Trash size={16} />
                                            Clear
                                        </button>
                                    </div>

                                    <div className="space-y-3">
                                        {passengers.map((p) => (
                                            <PassengerCard
                                                key={p.id}
                                                passenger={p}
                                                active={p.id === activePassenger}
                                                onSelect={setActivePassenger}
                                                onClear={clearForPassenger}
                                                selectedKg={selectedKg}
                                            />
                                        ))}


                                    </div>
                                </div>

                                {/* Right: Options */}
                                <div>
                                    <div className="mb-3">
                                        <SectionLabel>Chosse extra baggage</SectionLabel>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {options.map((o) => (
                                            <OptionTile
                                                key={o.id}
                                                option={o}
                                                active={o.id === selectedOption}
                                                onSelect={setSelectedOption}
                                                disabled={
                                                    passengers.find((p) => p.id === activePassenger)
                                                        ?.disabled
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <ModalFooter total={total} onCancel={onClose} onContinue={onContinue} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExtraBaggageModal;
