'use client';
import React, { useMemo, useState } from 'react';
import {
    Armchair,
} from '@phosphor-icons/react';
import { Baby, BabyCarriage, Briefcase, ForkKnifeIcon, Seat, Suitcase, User } from '@phosphor-icons/react/dist/ssr';
import SectionTitle from './SectionTitle';
import getPassengerType from '@/util/getLabelByType';

/* =========================
   Sample data (pass your own via props)
========================= */
const samplePassengers = [
    {
        id: 'p2',
        name: 'MR. Maged Saati',
        type: 'Adult',
        legs: [
            { id: 'out', from: 'DAM', to: 'DXB', flight: 'XH703' },
            { id: 'ret', from: 'DAM', to: 'DXB', flight: 'XH700' },
        ],
        baggage: { hand: '7kg', checked: '30kg' },
        seats: { label: 'Not selected' },
        meals: { label: 'Standard' },
    },
    {
        id: 'p1',
        name: 'Mstr. Mouayad Hawari',
        type: 'Infant',
        legs: [
            { id: 'out', from: 'DAM', to: 'DXB', flight: 'XH703' },
            { id: 'ret', from: 'DAM', to: 'DXB', flight: 'XH700' },
        ],
        baggage: { hand: '7kg', checked: '30kg' },
        seats: { label: 'Not selected' },
        meals: { label: 'Standard' },
    },

];

/* =========================
   Small UI atoms
========================= */


const Pill = ({ children }) => (
    <span className=" text-[12px] font-medium text-white/90">({children})</span>
);

const InfoLabel = ({ title, icon, value }) => (
    <div className="flex flex-col gap-2">
        <div className="text-[13px] text-500">{title}</div>
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-[14px] text-primary-1">{value}</span>
        </div>
    </div>
);

const SmallButton = ({ children, handleClickBtn }) => (
    <button
        disabled
        onClick={() => handleClickBtn(children)}
        className="mt-2 inline-flex items-center justify-center rounded-md bg-secondary-500 px-4 py-1.5 text-[12px] font-semibold text-white !cursor-not-allowed"
    >
        {children}
    </button>
);

/* =========================
   Passenger Card
========================= */
const TabButton = ({ leg, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`p-3 text-center border-b ${isActive ? 'bg-100' : 'bg-white'} border-[#EAEAE8]`}
    >
        <div className={`${isActive ? 'text-primary-1' : 'text-[#8A8A87]'} font-semibold`}>
            {leg.from} → {leg.to}
        </div>
        <div className={`text-xs ${isActive ? 'text-primary-1' : 'text-[#8A8A87]'} mt-1`}>
            {leg.flight}
        </div>
    </button>
);

const PassengerCard = ({ passenger, isTraveleAgent, isReturnFlightExists, tab, setTab, handleClickBtn }) => {

    const icons = {
        hand: Briefcase,
        checked: Suitcase,
        seats: Seat,
        meals: ForkKnifeIcon
    };

    const infoData = [
        { title: 'Hand baggage', value: passenger.baggage.hand, icon: icons.hand },
        { title: 'Checked baggage', value: passenger.baggage.checked, icon: icons.checked, btn: 'Add extra' },
        { title: 'Seats', value: passenger.seats.label, icon: icons.seats, btn: 'Select seats' },
        { title: 'Meals', value: passenger.meals.label, icon: icons.meals }
    ];
    const getIcon = (type) => {
        switch (type) {
            case "ADT": // Adult
                return <User size={18} />;
            case "CHD": // Child
                return <Baby size={18} />;
            case "INF": // Infant
                return <BabyCarriage size={18} />;
            default:
                return <User size={18} />; // fallback
        }
    };

    return (
        <div className="rounded-xl ring-1 ring-[#EAEAE8] overflow-hidden bg-white">
            {/* Header */}
            <div className="flex items-center gap-3 rounded-t-xl bg-primary-1 px-4 py-3 text-white">
                {passenger.type === "Adult" && <User size={18} />}
                {passenger.type === "Infant" && <Baby size={18} />}
                {getIcon(passenger.type)}
                <span className="text-[14px] font-semibold">{passenger.name}</span>
                <Pill>{getPassengerType(passenger.type)}</Pill>
            </div>

            {/* Tabs */}
            <div className={`grid grid-cols-${isReturnFlightExists ? 2 : 1}`}>
                {passenger.legs.map((leg, i) => (
                    <TabButton key={i} leg={leg} isActive={tab === i} onClick={() => setTab(i)} />
                ))}
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 px-6 py-5 bg-white">
                {infoData.map(({ title, value, icon: Icon, btn }, i) => (
                    <div key={i}>
                        <InfoLabel title={title} value={value} icon={<Icon size={18} className="text-primary-1" />} />
                        {btn && !isTraveleAgent && <SmallButton handleClickBtn={handleClickBtn}>{btn}</SmallButton>}
                    </div>
                ))}
            </div>
        </div>
    );
};


/* =========================
   Main List
========================= */
export default function PassengersInformation({ passengers, isTraveleAgent,
    firstSegment, secoundSegment, handleClickBtn }) {
    const [tabs, setTabs] = useState({});

    const isReturnFlightExists = secoundSegment && secoundSegment.departureAirport && secoundSegment.arrivalAirport;

    const handleTabChange = (passengerId, tabIndex) => {
        setTabs(prevTabs => ({
            ...prevTabs,
            [passengerId]: tabIndex,
        }));
    };

    //  Sort passengers once using useMemo
    const sortedPassengers = useMemo(() => {
        if (!Array.isArray(passengers)) return [];
        const order = { ADT: 1, CHD: 2, INF: 3 };
        return [...passengers].sort(
            (a, b) => (order[a.passengerType] || 99) - (order[b.passengerType] || 99)
        );
    }, [passengers]);

    const passengersInfo = sortedPassengers.map((p, index) => {
        const ancillary = p.ancillary || []; // Ensure ancillary exists

        return {
            id: `p${index}`,
            name: ` ${p.title ? p.title : ''}${`${p.title ? '.' : ''}`} ${p.firstName} ${p.lastName}`,
            type: p.passengerType,
            legs: [
                { id: 'out', from: firstSegment.departureAirport, to: firstSegment.arrivalAirport, flight: firstSegment.flightNumber },
                ...(isReturnFlightExists ? [{ id: 'ret', from: secoundSegment.departureAirport, to: secoundSegment.arrivalAirport, flight: secoundSegment.flightNumber }] : []),
            ],
            baggage: {
                hand: `${ancillary[0]?.handBaggage || '0'}kg`,
                checked: `${ancillary[0]?.checkedBaggage || '0'}kg`
            },
            seats: { label: ancillary[0]?.seats || 'Not selected' },
            meals: { label: ancillary[0]?.meal || 'Not selected' },
        };
    });

    return (
        <section className="w-full mx-auto">
            <SectionTitle >Passengers information</SectionTitle>

            <div className="mt-4 flex flex-col gap-8">
                {passengersInfo.map((p) => (
                    <PassengerCard
                        key={p.id}
                        passenger={p}
                        isTraveleAgent={isTraveleAgent}
                        isReturnFlightExists={isReturnFlightExists}
                        tab={tabs[p.id] || 0} // Default to first tab if no tab is set
                        setTab={(tabIndex) => handleTabChange(p.id, tabIndex)}
                        handleClickBtn={handleClickBtn}

                    />
                ))}
            </div>
        </section>
    );
}
