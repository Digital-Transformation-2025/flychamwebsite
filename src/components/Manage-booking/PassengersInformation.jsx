'use client';
import React, { useState } from 'react';
import {
    UserCircle,
    SuitcaseSimple,
    SuitcaseRolling,
    Armchair,
    ForkKnife,
    CaretRight,
} from '@phosphor-icons/react';
import { Baby, Briefcase, ForkKnifeIcon, Seat, Suitcase, User } from '@phosphor-icons/react/dist/ssr';
import SectionTitle from './SectionTitle';

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
    <span className="ml-2 text-[12px] font-medium text-white/90">({children})</span>
);

const Divider = () => <div className="h-[2px] w-full bg-primary-1 opacity-90" />;

const Rail = ({ left, right }) => (
    <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="p-4 border-b md:border-b-0 md:border-r border-[#EAEAE8]">
            <div className="text-center">
                <div className="text-primary-1 font-semibold">{left.from} → {left.to}</div>
                <div className="mt-1 text-xs text-[#8A8A87]">{left.flight}</div>
            </div>
        </div>
        <div className="p-4">
            <div className="text-center">
                <div className="text-[#8A8A87]">{right.from} → {right.to}</div>
                <div className="mt-1 text-xs text-[#8A8A87]">{right.flight}</div>
            </div>
        </div>
    </div>
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

const SmallButton = ({ children, onClick }) => (
    <button
        onClick={onClick}
        className="mt-2 inline-flex items-center justify-center rounded-md bg-secondary-1 px-4 py-1.5 text-[12px] font-semibold text-white hover:opacity-90"
    >
        {children}
    </button>
);

/* =========================
   Passenger Card
========================= */
const PassengerCard = ({ passenger }) => {
    // active leg tab per card (0: outbound, 1: return)
    const [tab, setTab] = useState(0);
    const activeLeft = passenger.legs[0];
    const activeRight = passenger.legs[1];

    return (
        <div className="rounded-xl ring-1 ring-[#EAEAE8] overflow-hidden bg-white">
            {/* Header bar */}
            <div className="flex items-center gap-3 rounded-t-xl bg-primary-1 px-4 py-3 text-white">
                {passenger.type === "Adult" && <User size={18} weight="regular" />}
                {passenger.type === "Infant" && <Baby size={18} weight="regular" />}

                <span className="text-[14px] font-semibold">{passenger.name}</span>
                <Pill>{passenger.type}</Pill>
            </div>

            {/* Tabs mimic (left tab highlighted) */}
            <div className="hidden md:block">
                <Rail left={activeLeft} right={activeRight} />
                <Divider />
            </div>

            {/* Mobile stack for the two tabs */}
            <div className="md:hidden grid grid-cols-2">
                <button
                    onClick={() => setTab(0)}
                    className={`p-3 text-center border-b ${tab === 0 ? 'bg-[#F0F5F8]' : 'bg-white'} border-[#EAEAE8]`}
                >
                    <div className={`${tab === 0 ? 'text-primary-1' : 'text-[#8A8A87]'} font-semibold`}>
                        {activeLeft.from} → {activeLeft.to}
                    </div>
                    <div className="text-xs text-[#8A8A87] mt-1">{activeLeft.flight}</div>
                </button>
                <button
                    onClick={() => setTab(1)}
                    className={`p-3 text-center border-b ${tab === 1 ? 'bg-[#F0F5F8]' : 'bg-white'} border-[#EAEAE8]`}
                >
                    <div className={`${tab === 1 ? 'text-primary-1' : 'text-[#8A8A87]'} font-semibold`}>
                        {activeRight.from} → {activeRight.to}
                    </div>
                    <div className="text-xs text-[#8A8A87] mt-1">{activeRight.flight}</div>
                </button>
            </div>

            {/* Content row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 px-6 py-5 bg-white">
                {/* Hand baggage */}
                <div>
                    <InfoLabel
                        title="Hand baggage"
                        value={passenger.baggage.hand}
                        icon={<Briefcase size={18} className="text-primary-1" />}
                    />
                </div>

                {/* Checked baggage */}
                <div>
                    <InfoLabel
                        title="Checked baggage"
                        value={passenger.baggage.checked}
                        icon={<Suitcase size={18} className="text-primary-1" />}
                    />
                    <SmallButton>Add extra</SmallButton>
                </div>

                {/* Seats */}
                <div>
                    <InfoLabel
                        title="Seats"
                        value={passenger.seats.label}
                        icon={<Armchair size={18} className="text-primary-1" />}
                    />
                    <SmallButton>
                        Select seats
                    </SmallButton>
                </div>

                {/* Meals */}
                <div>
                    <InfoLabel
                        title="Meals"
                        value={passenger.meals.label}
                        icon={<ForkKnifeIcon size={18} className="text-primary-1" />}
                    />
                </div>
            </div>
        </div>
    );
};

/* =========================
   Main List
========================= */
export default function PassengersInformation({ passengers = samplePassengers }) {
    return (
        <section className="w-full  mx-auto">
            <SectionTitle>Passengers information</SectionTitle>

            <div className="mt-4 flex flex-col gap-8 ">
                {passengers.map((p) => (
                    <PassengerCard key={p.id} passenger={p} />
                ))}
            </div>
        </section>
    );
}
