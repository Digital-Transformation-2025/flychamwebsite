'use client';
import React from 'react';
import { Info, ArrowsLeftRight, ArrowCircleUp, Clock } from '@phosphor-icons/react';
import logo from '../../assets/images/tabicon.png';
import { Airplane, ArrowFatLinesUp, ArrowsClockwise } from '@phosphor-icons/react/dist/ssr';

/* =========================
   Sample data (you can pass your own via props)
========================= */
const sampleFlights = [
    {
        id: 'leg-out',
        sectionTitle: 'Outbound flight',
        actions: [{ id: 'change', label: 'Change Flight' }, { id: 'upgrade', label: 'Upgrade Class' }],
        banner: {
            fromCity: 'Damascus',
            toCity: 'Dubai',
            dateText: 'Thu, 10 Jul 2025',
            chip: { text: 'On time', bg: '#357B47', fg: '#F4FFF6' },
            rightNote: { text: 'Online  check-in is  open' },
        },
        left: { code: 'DAM', time: '16:00', airport: 'Damascus International  Airport' },
        right: { code: 'DXB', time: '18:30', airport: 'Dubai International  Airport' },
        mid: { durationText: 'Non-stop, 2h 30m', cabin: 'Business Class' },
    },
    {
        id: 'leg-ret',
        sectionTitle: 'Return flight',
        actions: [{ id: 'change', label: 'Change Flight' }, { id: 'upgrade', label: 'Upgrade Class' }],
        banner: {
            fromCity: 'Dubai',
            toCity: 'Damascus',
            dateText: 'Thu, 31 Jul 2025',
        },
        left: { code: 'DXB', time: '18:30', airport: 'Dubai International  Airport' },
        right: { code: 'DAM', time: '16:00', airport: 'Damascus International  Airport' },
        mid: { durationText: 'Non-stop, 2h 30m', cabin: 'Business Class' },
    },
];

/* =========================
   Small UI atoms
========================= */
const Pill = ({ text, bg, fg }) => (
    <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: bg, color: fg }}>
        {text}
    </span>
);

const Dot = ({ filled = true }) => (
    <span
        className={`inline-block rounded-full ${filled ? 'bg-[#054E72]' : 'border-2 border-[#054E72]'} `}
        style={{ width: 12, height: 12 }}
    />
);

const FlightDetailsLink = () => (
    <button className="text-[13px] underline text-[#054E72] font-semibold hover:opacity-90">Flight details</button>
);

/* =========================
   Banner
========================= */
const CardBanner = ({ from, to, dateText, chip, rightNote }) => (
    <div className="flex items-center flex-col lg:flex-row justify-between gap-3 rounded-t-lg bg-primary-1 px-4 py-3 text-white">
        <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/10 px-2.5 py-1 text-[13px] font-semibold">
                {from} <span className="mx-1">→</span> {to}
            </span>
            <span className="text-[13px] opacity-90">.{dateText}</span>
            {chip && <Pill text={chip.text} bg={chip.bg} fg={chip.fg} />}
        </div>

        {rightNote && (
            <div className="flex items-center gap-2 text-[13px]">
                <Clock size={16} className="opacity-90" />
                <span className="underline">{rightNote.text}</span>
            </div>
        )}
    </div>
);

/* =========================
   Columns
========================= */
const TimeCol = ({ code, time, airport, align = 'left' }) => {
    const al = align === 'right' ? 'items-end text-right' : 'items-start text-left';
    return (
        <div className={`flex w-full flex-col ${al} gap-1`}>
            <div className="text-[#8A8A87] text-xs tracking-wide">{code}</div>
            <div className="text-[#282826] text-3xl leading-none">{time}</div>
            <div className="text-[12px] text-[#8A8A87]">{airport}</div>
        </div>
    );
};

const MidTimeline = ({ duration, cabin }) => (
    <div className="flex w-full flex-col items-center gap-3">
        <div className="text-[12px] text-[#8A8A87]">{duration}</div>

        {/* timeline */}
        <div className="flex w-full max-w-[560px] items-center gap-3">
            <Dot filled />
            <div className="h-[2px] flex-1 border-b border-dotted border-primary-1/70" />
            <div className="grid h-11 w-11 place-items-center rounded-full bg-primary-1">
                <img src={logo.src ?? logo} alt="plane" className="h-6 w-6 object-contain" />
            </div>
            <div className="h-[2px] flex-1 border-b border-dotted border-primary-1/70" />
            <Dot filled={false} />
        </div>

        <div className="text-[13px] font-semibold text-primary-1">{cabin}</div>
    </div>
);

/* =========================
   Section header (title + actions)
========================= */
const SectionHeader = ({ title, onAction }) => (
    <div className="mb-4 flex flex-wrap items-center gap-4 text-[#5F5F5C]">
        <div className="flex items-center gap-2 text-[15px] font-medium">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-primary-1 text-white rotate-270">
                <Airplane size={16} />
            </span>
            {title}
        </div>

        <span className="hidden sm:block h-5 w-px bg-[#DADAD7]" />

        <div className="flex items-center gap-4 text-primary-1">
            <button
                type="button"
                onClick={() => onAction?.('change')}
                className="flex items-center font-semibold gap-2 text-[13px]  hover:opacity-90"
            >
                <ArrowsClockwise size={18} />

                Change Flight
            </button>
            <span className="hidden sm:block h-5 w-px bg-[#DADAD7]" />
            <button
                type="button"
                onClick={() => onAction?.('upgrade')}
                className="flex items-center font-semibold gap-2 text-[13px]  hover:opacity-90"
            >
                <ArrowFatLinesUp size={18} /> Upgrade Class
            </button>
        </div>
    </div>
);

/* =========================
   Main Card
========================= */
const FlightCard = ({ leg, onAction }) => (
    <section className="w-full">
        <SectionHeader title={leg.sectionTitle} onAction={(a) => onAction?.(leg.id, a)} />

        <div className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#EAEAE8]">
            <CardBanner
                from={leg.banner.fromCity}
                to={leg.banner.toCity}
                dateText={leg.banner.dateText}
                chip={leg.banner.chip}
                rightNote={leg.banner.rightNote}
            />

            <div className="grid grid-cols-1 gap-6 bg-[#F5F5F4] px-4 py-6 md:grid-cols-[1fr_auto_1fr] md:items-center">
                <TimeCol code={leg.left.code} time={leg.left.time} airport={leg.left.airport} />
                <MidTimeline duration={leg.mid.durationText} cabin={leg.mid.cabin} />
                <TimeCol code={leg.right.code} time={leg.right.time} airport={leg.right.airport} align="right" />
            </div>

            <div className="bg-[#F5F5F4] px-4 pb-5">
                <FlightDetailsLink />
            </div>
        </div>
    </section>
);

/* =========================
   List Wrapper
========================= */
export default function FlightItineraryList({ flights = sampleFlights, onAction }) {
    return (
        <div className="mx-auto flex w-full  flex-col gap-10  py-4">
            {flights.map((leg) => (
                <FlightCard key={leg.id} leg={leg} onAction={onAction} />
            ))}
        </div>
    );
}
