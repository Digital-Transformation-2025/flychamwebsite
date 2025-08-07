'use client';
import React, { useRef, useState } from 'react';
import useIsMobile from '@/hooks/useIsMobile';
import { CaretDown, CaretUp, CheckCircle } from '@phosphor-icons/react';
import FlightDetails from '../FlightDetails';
import { motion, AnimatePresence } from 'framer-motion';
import FareCard from '../FareCard';
import FlightCodes from '../FlightCodes';
import FlightTimeInfo from '../FlightTimeInfo';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import DetailsTab from './DetailsTab';
import { useSelector } from 'react-redux';


// Main Card
const FlightCard = ({
    flight,
    isExpanded = false,
    onDetailsClick, isConfirmed, handleSelectPlan, selectedType, activeTab, setActiveTab
}) => {

    const cardRef = useRef(null);
    const { isLoadingFlights } = useSelector((s) => s.flights)
    const { duration, stops, ecoFare, busFare, segments, flightType } = useFormattedFlightTimes(flight);
    const isXl = useIsMobile(1280);
    const isLg = useIsMobile(1078);
    const isMd = useIsMobile(768);
    const [expanded, setExpanded] = useState(isExpanded);
    // if (isLoadingFlights) {
    //     return <SkeletonFlightCard />;
    // }
    return (
        
        <article
            ref={cardRef}

            onClick={() => setExpanded(prev => {
                if (!prev) {
                    setTimeout(() => {
                        if (cardRef.current) {
                            cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                        }
                    }, 400);
                }
                return !prev;
            })}
            className={`
                        relative  
            w-full p-4 lg:py-8 lg:px-8 flex flex-col items-center lg:items-stretch 
            rounded-[12px]
            ${isConfirmed
                    ? 'border border-[#34C759] bg-[#F5F5F4] shadow-[0px_2px_10px_rgba(0,0,0,0.1)]'
                    : 'bg-100'
                }
            ${!isConfirmed ? 'cursor-pointer' : ''}
          `}
        >
            {isConfirmed && (
                <div className="absolute top-0 right-0 flex items-center justify-center gap-1 rounded-bl-[12px] rounded-tr-[12px] bg-green px-3 py-1 text-white text-xs font-semibold shadow-sm">
                    <CheckCircle color='#FFF' size={18} weight='bold' /> Selected flight
                </div>
            )}

            <div className={`flex   gap-0 ${isLg ? 'flex-col' : 'flex-row '}   md:gap-3  justify-between  items-start lg:items-center`}>

                <div className='flex flex-col items-start gap-4 '>
                    {segments?.length === 1 &&
                        <div className="text-600 text-sm pt-2 self-center">
                            {stops > 0 ? stops : 'Non-stop , '}
                            {duration}
                        </div>
                    }
                    {segments?.length === 2 &&
                        <div className="text-600 text-sm pt-2 self-center">
                            Non-stop: {segments[0]?.Duration}
                        </div>
                    }
                    {segments?.map((s, idx) => {
                        return (
                            <FlightTimeInfo
                                s={s}
                                idx={idx}
                                flight={flight}
                                isLg={isLg}
                                isMd={isMd}
                                isXl={isXl}
                            />
                        )
                    })}
                    {segments?.length === 2 &&
                        <div className="text-600 text-sm pt-2 self-center">
                            Non-stop: {segments[1]?.Duration}
                        </div>
                    }

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDetailsClick(flight);
                        }} className="cursor-pointer text-primary-1 text-[12px] md:text-sm font-bold underline  w-fit"
                    >
                        Flight details
                    </button>
                </div>
                <div className={`${isConfirmed ? "px-3 py-3" : "p-0"} w-full flex justify-between items-center  flex-wrap gap-4 my-2 md:my-0`}>
                    <div className="w-full flex flex-row gap-10 items-center md:items-start self-center justify-center xl:justify-end">
                        {isConfirmed ?
                            <FareCard isConfirmed={isConfirmed} type={selectedType.type} currecny={flight?.common_info?.currency} price={selectedType.price} special={selectedType.special} isLg={isLg} />
                            :
                            <>
                                <FareCard isConfirmed={isConfirmed} type="Economy" currecny={flight?.common_info?.currency} price={ecoFare} special={false} isLg={isLg} />
                                <FareCard isConfirmed={isConfirmed} type="Business" currecny={flight?.common_info?.currency} price={busFare} special={false} isLg={isLg} />
                            </>
                        }


                        {!isConfirmed &&

                            <div className="hidden xl:block cursor-pointer" >
                                <AnimatePresence mode="wait" initial={false}>
                                    {expanded ? (
                                        <motion.span
                                            key="up"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CaretUp size={28} className="text-primary-1" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="down"
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CaretDown size={28} className="text-primary-1" />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                        }



                    </div>
                </div>
            </div>

            <div className="w-full h-px bg-[#E5E5E3] my-4 lg:my-6" />
            <div className="flex flex-col lg:flex-row items-center justify-between my-2">
                <div className='flex items-center justify-between gap-4 mb-4 lg:mb-0'>

                    {flight?.common_info?.segments?.map((s) => {
                        return (
                            <FlightCodes flight_number={s.FlightNumber} />
                        )
                    })}
                </div>
                {expanded && flightType === "Return" &&
                    <DetailsTab
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        flight={flight}
                    />
                }
            </div>


            {!isConfirmed &&

                <AnimatePresence initial={false}>
                    {expanded && (
                        <motion.div
                            key="flight-details"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="overflow-hidden w-full "
                        >
                            <FlightDetails handleSelectPlan={handleSelectPlan} flight={flight} activeTab={activeTab} />
                        </motion.div>
                    )}
                </AnimatePresence>

            }



        </article>


    );
};

export default FlightCard;
