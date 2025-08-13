'use client'
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails';
import useIsMobile from '@/hooks/useIsMobile';
import { ArrowLeft, ArrowRight, ArrowsLeftRight } from '@phosphor-icons/react';
import React from 'react';
import { useSelector } from 'react-redux';

const RouteInfo = ({ isMobileHeader }) => {
    const isLg = !useIsMobile(1024);

    const { destination, origin, date, flighttype } = useFlightRouteDetails()
    const iconColor = isMobileHeader ? ' text-primary-1' : 'text-400'
    console.log('destinationdestination.iataCode', destination);

    return (
        <section className="">
            <div className="flex">
                <div className="flex items-start justify-center gap-4 flex-wrap md:flex-nowrap">
                    {/* From */}
                    <div className="text-start">
                        <h1 className="text-primary-1 text-[16px] lg:text-[32px]  font-bold leading-tight">
                            {origin.city}
                        </h1>

                        <p className="hidden lg:block text-primary-1 text-xs text-start font-normal">
                            {`${origin.originAirPortName} (${origin.iataCode})`}
                        </p>



                    </div>

                    {/* Arrow */}
                    <div className="flex flex-col item-center">
                        {flighttype === "OneWay" &&
                            <div className="flex justify-center items-center">
                                <ArrowRight size={isLg ? 30 : 20} className={iconColor} />
                            </div>
                        }
                        {flighttype === "Return" &&
                            <div className="flex justify-center items-center">
                                <ArrowsLeftRight size={isLg ? 30 : 20} className={iconColor} />
                            </div>
                        }
                    </div>

                    {/* To */}
                    <div className="text-start">
                        <h1 className="text-primary-1 text-[16px] lg:text-[32px]  font-bold leading-tight">
                            {destination.city}
                        </h1>
                        { }
                        <p className="hidden lg:block text-primary-1 text-xs text-start font-normal">
                            {destination.destenationAirPortName} ({destination.iataCode})
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RouteInfo;
