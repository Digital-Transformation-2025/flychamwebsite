'use client';
import Image from 'next/image';
import { ArrowRight, ForkKnifeIcon, MonitorPlayIcon, Newspaper, WifiHigh } from '@phosphor-icons/react';
import timeline from '@/assets/images/timeline.png';
import tabicon from '@/assets/images/tabicon.png';
import formatTime from '@/util/formatFlightTime';

const FlightSegmentDetails = ({
    origin,
    destination,
    arrivalDate,
    departureDate,
    duration,
    stops,
    departureTime,
    arrivalTime,
    departureAirport,
    arrivalAirport,
    flightNumber
}) => {
    const Amenities = ({ amenities }) => {
        const iconMap = {
            'Entertainment': <MonitorPlayIcon size={20} />,
            'Optional Meal': <ForkKnifeIcon size={20} />,
            // 'WIFI': <WifiHigh size={20} />,
            'Magazine': <Newspaper size={20} />
        };

        return (
            <div className="bg-[#a6cfe052] rounded-md p-3 mb-2 max-w-[291px]">
                <ul className="text-[#374151] space-y-2">
                    {amenities.map((item, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                            {iconMap[item]} <span>{item}</span>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <>
            <div className="flex items-center gap-2 text-sm font-medium text-main mb-1 ">
                <span>{origin.city}</span>
                <span className="text-gray-400">
                    <ArrowRight size={22} />
                </span>
                <span>{destination.city}</span>
            </div>

            <p className="text-[#3E3E3B] text-sm ">{departureDate}</p>
            <p className="text-[#3E3E3B] text-sm mb-4">
                {`Total duration ${duration}`}
                {stops && <span className="text-[#B00] font-medium ">1 stop</span>}
            </p>

            <div className="flex items-start gap-3 my-8  ">
                {/* Times */}
                <div className="flex flex-col justify-between text-sm text-[#111827] font-medium w-[65px] min-h-[248px] text-start">
                    <span className="text-start text-600 ">{formatTime(departureTime)}</span>
                    <span className="text-xs text-main">{duration}</span>
                    <span className="text-start text-600">{formatTime(arrivalTime)}</span>
                </div>

                {/* Timeline */}
                <div className="flex flex-col items-center">
                    <Image src={timeline} alt="timeline" className="w-[11px] h-full" />
                </div>

                {/* Segment content */}
                <div className="flex flex-col gap-[12px] flex-1 text-sm !min-h-[248px] justify-between">
                    <p className="font-medium mb-1 text-[#282826]">{departureAirport}</p>
                    <div className='flex flex-col gap-2'>
                        <p className="text-[#6B7280]  flex items-center gap-1">
                            <Image src={tabicon} alt="flight icon" width={16} height={16} />
                            {flightNumber}
                        </p>

                        <Amenities amenities={['Entertainment', 'Optional Meal', 'Magazine']} />
                    </div>
                    <p className="mt-1">{arrivalAirport}</p>
                </div>
            </div>
        </>
    );
};

export default FlightSegmentDetails;
