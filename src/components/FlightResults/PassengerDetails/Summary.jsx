'use client'
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowsLeftRight, CheckCircle } from '@phosphor-icons/react';
import tabIcon from '@/assets/images/tabicon.png';
import Image from 'next/image';
import DurationDashed from '../DurationDashed';
import formatDateReadble from '@/util/formatDateReadble';
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import useFlightDetails from '@/hooks/useFlightDetails';
import FlightTimeInfo from '../FlightTimeInfo';
import useIsMobile from '@/hooks/useIsMobile';
import PricingAccordion from './PricingAccordion';
const data = {
    title: 'Price summary',
    from: 'Damascus',
    to: 'Dubai',
    date: '10, JUL 2025',
    time: { dep: '16:00', arr: '18:30', depCode: 'DAM', arrCode: 'DXB', duration: 'Non-stop, 2h 30m' },
    classType: 'Business',
    fare: { label: 'Adult X1', base: 'USD 850', taxes: 'USD 45', total: 'USD 900' },
    note: 'Free cancellation within 24 hours of booking',
    links: [
        { label: 'View detailed fare rules', href: '#' },
        { label: 'Cost breakdown', href: '#' }
    ]
};

const Summary = ({ selectedFlight, selectedType }) => {
    const { origin, destination, date, flighttype, dateReturn } = useFlightRouteDetails();
    const isXl = useIsMobile(1280);
    const isLg = useIsMobile(1078);
    const isMd = useIsMobile(768);
    const [expandedType, setExpandedType] = useState(null);

    const toggleAccordion = (type) => {
        setExpandedType(expandedType === type ? null : type);
    };


    const { arrivalTime, departureTime, duration, segments } = useFormattedFlightTimes(selectedFlight);

    const {
        type,
        transaction_id,
        total_fare_USD,
        pricing_info,
        info, currency
    } = useFlightDetails(selectedType);



    const getLabel = (key) => {
        switch (key) {
            case "ADT":
                return "Adult";
            case "CHD":
                return "Child";
            case "INF":
                return "Infant";
            default:
                return key;
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 w-full   text-sm font-[Montserrat] shadow-summary">
            <h2 className="text-[#000] text-[18px] font-semibold mb-4">Price summary</h2>

            <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2 font-semibold text-[16px]">
                    <span className="text-primary-1">{origin.city}</span>
                    <div className="flex flex-col item-center">

                 
                        {flighttype === "OneWay" &&
                            <div className="flex justify-center items-center">
                            <ArrowRight size={16} className="text-[#5F5F5C]" />
                            </div>
                        }
                        {flighttype === "Return" &&
                            <div className="flex justify-center items-center">
                                <ArrowsLeftRight  size={16} className="text-[#5F5F5C]" />
                            </div>
                        }
                    </div>
                    <span className="text-primary-1">{destination.city}</span>
                    <CheckCircle size={16} weight="fill" className="text-green" />
                </div>
            </div>
            <p className="text-[#5F5F5C] text-sm mb-4">{formatDateReadble(date)}</p>
            {flighttype === "Return" &&
                <>
                    <span> - </span>
                    <p className="text-[#5F5F5C] text-sm mb-4">{formatDateReadble(dateReturn)}</p>

                </>
            }
            <div className="mt-3 mb-4">
                <span className="inline-block bg-primary-1 text-white text-sm font-medium px-4 py-1">
                    {type}
                </span>
            </div>

            <hr className="border-t border-[#E5E5E3] my-4" />
            <PricingAccordion pricingInfo={info?.pricing_info} />

            <div className="flex justify-between font-semibold mt-3  text-lg"><span className="text-700"> Total</span>
                <span className="text-700 text-lg">{`${selectedType?.
                    commonInfo
                    ?.currency} ${info.total_fare}`}
                </span></div>




            <hr className="border-t border-[#E5E5E3] my-4" />

            {/* <p className="text-600 text-xs mb-4">{data.note}</p> */}

            {/* <div className="space-y-2 text-sm">
                {data.links.map(({ label, href }, i) => (
                    <a key={i} href={href} className="text-primary-1 underline font-medium">{label}</a>
                ))}
            </div> */}
        </div>
    );
}

export default Summary;
