'use client';
import React, { useEffect, useState } from 'react';
import { Info, ArrowsLeftRight, ArrowCircleUp, Clock } from '@phosphor-icons/react';
import logo from '../../assets/images/tabicon.png';
import { Airplane, ArrowFatLinesUp, ArrowRight, ArrowsClockwise, XCircle } from '@phosphor-icons/react/dist/ssr';
import useIsMobile from '@/hooks/useIsMobile';
import { object } from 'yup';

/* =========================
   Sample data (you can pass your own via props)
========================= */


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
        className={`inline-block rounded-full ${filled ? 'bg-primary-1  border-primary-1' : 'border-2 !border-[#054E72]'} `}
        style={{ width: 12, height: 12 }}
    />
);

const FlightDetailsLink = () => (
    <button className="text-[13px] underline text-primary-1 font-semibold hover:opacity-90">Flight details</button>
);

/* =========================
   Banner
========================= */
const CardBanner = ({ from, to, dateText, chip, rightNote, isMobile }) => (
    <div className="flex items-start  lg:items-center  flex-col lg:flex-row justify-between gap-3 rounded-t-lg bg-primary-1 px-4 py-3 text-white">
        <div className="flex flex-col lg:flex-row  flex-wrap  w-full items-start lg:items-end gap-2">
            <div className='flex items-center justify-start gap-2'>
                <span className='font-bold text-sm lg:text-2xl'>
                    {from}
                </span>
                <ArrowRight size={isMobile ? 14 : 24} />
                <span className='font-bold  text-sm lg:text-2xl'>

                    {to}
                </span>
            </div>
            {/* <span className="text-xs lg:text-[16px] ">{dateText}</span> */}
            {/* {chip && <Pill text={chip.text} bg={chip.bg} fg={chip.fg} />} */}
        </div>
        {dateText && (
            <div className="items-center gap-2 text-[13px]  flex">
                <Clock size={16} weight='bold' />
                <span className=" font-semibold whitespace-nowrap">
                    {dateText}
                </span>
            </div>
        )}

    </div>
);

/* =========================
   Columns
========================= */
const TimeCol = ({ code, time, airport, align = 'left' }) => {
    return (
        <div className={`flex w-full flex-col-reverse xl:flex-col justify-center items-center lg:items-center lg:text-center  gap-1`}>
            <div className="text-600 text-xs  md:text-xs sm:text-sm xl:text-lg text-center  tracking-wide font-normal">{code}</div>
            <div className="text-800 text-xl  md:text-2xl xl:text-3xl font-light leading-none">{time}</div>
            <div className="text-sm   text-600 font-medium hidden xl:block">{airport}</div>
        </div>
    );
};
const Dots = ({ side, dashedLength }) => (
    <div className="flex items-center gap-[4px] mx-[6px]">
        {Array.from({ length: dashedLength }).map((_, i) => (
            <span
                key={`${side}-${i}`}
                className="w-[3px] lg:w-[4px] h-[2px] lg:h-[2px] bg-primary-1 "
            />
        ))}
    </div>
);

const MidTimeline = ({ duration, cabin, dashedLength, isMobile }) => {
    const logoW = isMobile ? '4' : '8'
    const logoWrapper = isMobile ? '8' : '14'

    return (
        <div className="flex w-full flex-col  items-center gap-3">
            <div className="text-[12px] sm:text-sm text-600">{duration}</div>

            {/* timeline */}
            <div className="flex w-full max-w-[560px] justify-center items-center gap-1 md:gap-3">
                <Dot filled />
                <Dots side="left" dashedLength={dashedLength} />

                <div className={`grid h-${logoWrapper} w-${logoWrapper} place-items-center rounded-full bg-primary-1`}>
                    <img src={logo.src ?? logo.src} alt="plane" className={`h-${logoW} w-${logoW} object-contain`} />
                </div>
                <Dots side="right" dashedLength={dashedLength} />

                <Dot filled={false} />
            </div>

            <div className="text-[12px] lg:text-sm font-semibold text-primary-1">{`${cabin} class`}</div>
        </div>
    );
}

/* =========================
   Section header (title + actions)
========================= */
const ActionButton = ({ icon: Icon, label, action, color = "text-[13px] text-primary-1", onAction }) => (
    <button
        type="button"
        disabled
        onClick={onAction}
        className={`
            !cursor-not-allowed  flex items-center font-semibold gap-2 hover:opacity-90 ${color} text-primary-500`}
    >
        <Icon size={18} /> {label}
    </button>
);

const Divider = () => <span className="h-5 w-px bg-primary-1" />;

const SectionHeader = ({ title, onAction }) => (
    <div className="mb-4  text-[#5F5F5C]  ">
        <div className="flex flex-col items-start  flex-wrap  gap-4">
            <div className="mb-4 flex items-center gap-2 text-lg md:text-xl font-medium">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-1 text-white rotate-90">
                    <Airplane size={16} />
                </span>
                {title}
            </div>
            <div className="flex w-full justify-between items-center">
                <div className="flex w-full justify-evenly md:justify-start gap-4">
                    <ActionButton icon={ArrowsClockwise} label="Change Flight" action="change" onAction={onAction} />
                    <Divider />
                    <ActionButton icon={ArrowFatLinesUp} label="Upgrade Class" action="upgrade" onAction={onAction} />

                </div>
     

            </div>

        </div>

    </div>
);

/* =========================
   Main Card
========================= */
const FlightCard = ({ leg, dashedLength, isMobile, handleClickDetails }) => (
    <section className="w-full ">
        <SectionHeader title={leg.sectionTitle}  />

        <div className=" overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-[#EAEAE8]">
            <CardBanner
                from={leg.banner.fromCity}
                to={leg.banner.toCity}
                dateText={leg.banner.dateText}
                chip={leg.banner.chip}
                rightNote={leg.banner.rightNote}
                isMobile={isMobile}
            />

            <div className=" px-4 py-5 flex  gap-6 bg-[#F5F5F4]   md:items-center">
                <TimeCol code={leg.left.code} time={leg.left.time} airport={leg.left.airport} />
                <MidTimeline dashedLength={dashedLength} duration={leg.mid.durationText} cabin={leg.mid.cabin} isMobile={isMobile} />
                <TimeCol code={leg.right.code} time={leg.right.time} airport={leg.right.airport} align="right" />
            </div>

            <div
                onClick={() => handleClickDetails(leg)}
                className="flex items-center justify-between bg-[#F5F5F4]  px-4 py-3">
                <FlightDetailsLink />
     
            </div>

        </div>

    </section>
);

/* =========================
   List Wrapper
========================= */
export default function FlightItineraryList({ onAction, firstSegment, secoundSegment,  handleClickDetails }) {
    const isMobile = useIsMobile()
    const segmentData = (segment) => ({
        fromCity: segment?.departureCity,
        toCity: segment?.arrivalCity,
        dateText: segment?.departureDate,
        durationText: segment?.duration,
        cabin: segment?.cabinClass,
        departureAirport: segment?.departureAirport,
        arrivalAirport: segment?.arrivalAirport,
        departureTime: segment?.departureTime,
        arrivalTime: segment?.arrivalTime,
        departureAirPortName: segment?.departureAirPortName,
        arrivalAirPortName: segment?.arrivalAirPortName,
        flightNumber: segment?.flightNumber,
    });

    const firstSegmentData = segmentData(firstSegment);
    const secoundSegmentData = secoundSegment ? segmentData(secoundSegment) : null;

    const flights = [
        {
            id: 'leg-out',
            sectionTitle: 'Outbound flight',
            actions: [{ id: 'change', label: 'Change Flight' }, { id: 'upgrade', label: 'Upgrade Class' }],
            banner: {
                fromCity: firstSegmentData.fromCity,
                toCity: firstSegmentData.toCity,
                dateText: firstSegmentData.dateText,
                chip: { text: 'On time', bg: '#357B47', fg: '#F4FFF6' },
                rightNote: { text: 'Online check-in is open' },
            },
            left: { code: firstSegmentData.departureAirport, time: firstSegmentData.departureTime, airport: firstSegmentData.departureAirPortName },
            right: { code: firstSegmentData.arrivalAirport, time: firstSegmentData.arrivalTime, airport: firstSegmentData.arrivalAirPortName },
            mid: { durationText: `Non-stop, ${firstSegmentData.durationText}`, cabin: firstSegmentData.cabin },
            flightNumber: firstSegmentData?.flightNumber

        },

        // Conditionally adding the second segment if it exists
        ...(secoundSegmentData ? [{
            id: 'leg-return',
            sectionTitle: 'Return flight',
            actions: [{ id: 'change', label: 'Change Flight' }, { id: 'upgrade', label: 'Upgrade Class' }],
            banner: {
                fromCity: secoundSegmentData.fromCity,
                toCity: secoundSegmentData.toCity,
                dateText: secoundSegmentData.dateText,
                chip: { text: 'On time', bg: '#357B47', fg: '#F4FFF6' },
                rightNote: { text: 'Online check-in is open' },
            },
            left: { code: secoundSegmentData.departureAirport, time: secoundSegmentData.departureTime, airport: secoundSegmentData.departureAirPortName },
            right: { code: secoundSegmentData.arrivalAirport, time: secoundSegmentData.arrivalTime, airport: secoundSegmentData.arrivalAirPortName },
            mid: {
                durationText: `Non-stop, ${secoundSegmentData.durationText}`, cabin: secoundSegmentData.cabin
            },
            flightNumber: secoundSegmentData?.flightNumber

        }] : []),  // Only add if secoundSegmentData exists
    ];

    const [dashedLength, setDashedLength] = useState(20);

    useEffect(() => {
        const breakpoints = [
            [1600, 20],
            [1500, 18],
            [1400, 14],
            [1280, 12],
            [1100, 14],
            [900, 12],
            [800, 12],
            [700, 12],
            [600, 18],
            [500, 10],
            [400, 8],
            [350, 4],
            [300, 3],
            [0, 2], // default
        ];

        const updateLength = () => {
            const w = window.innerWidth;
            const [, length] = breakpoints.find(([minWidth]) => w >= minWidth);
            setDashedLength(length);
        };

        updateLength();
        window.addEventListener("resize", updateLength);
        return () => window.removeEventListener("resize", updateLength);
    }, []);

    return (
        <div className="mx-auto flex w-full flex-col gap-10 py-4">
            {flights.map((leg) => (
                <FlightCard
                    key={leg.id} leg={leg} onAction={onAction}
                    dashedLength={dashedLength}
                    isMobile={isMobile}
                    handleClickDetails={handleClickDetails}
                />
            ))}
        </div>
    );
}
