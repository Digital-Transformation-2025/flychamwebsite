'use client';
import React, { useMemo, useState } from 'react';

import ModalHeader from './ModalHeader';
import ModalBody from './ModalBody';
import ModalFooter from './ModalFooter';
import MobileOptionsSheet from './MobileOptionsSheet';


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
    const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
    const selectedKg = useMemo(
        () => options.find((o) => o.id === selectedOption)?.kg,
        [options, selectedOption]
    );
    const selectedPrice = useMemo(
        () => options.find((o) => o.id === selectedOption)?.price ?? 0,
        [options, selectedOption]
    );

    const total = useMemo(() => selectedPrice * 1, [selectedPrice]);

    const clearForPassenger = () => setSelectedOption(null);

    const onContinue = () => {
        onClose();
    };

    return (
        <div className="fixed inset-0 z-[100] "
        >
            {/* backdrop */}
            {/* <div
                className="absolute inset-0 bg-black/70"
                onClick={onClose}
                aria-hidden
            /> */}
            {/* panel */}
            <div className="absolute inset-0 ">
                <div className="mx-auto w-full">
                    <div className=" bg-white md:shadow-[0_14px_40px_rgba(0,0,0,0.20)] h-[100vh] md:h-[100vh] flex flex-col justify-between">
                        {/* Header */}
                        <ModalHeader
                            onClose={onClose}
                            legs={legs}
                            activeLeg={activeLeg}
                            setActiveLeg={setActiveLeg}
                        />
                        <div className='w-full max-w-6xl mx-auto overflow-auto'>




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
                        </div>
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
