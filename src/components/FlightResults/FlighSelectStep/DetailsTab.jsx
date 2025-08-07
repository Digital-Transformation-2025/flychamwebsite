'use client';
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails';
import useFormattedFlightTimes from '@/hooks/useFormattedFlightTimes';
import useIsMobile from '@/hooks/useIsMobile';
import { ArrowRight } from '@phosphor-icons/react';
import React from 'react';

const DetailsTab = ({ activeTab, setActiveTab, flight }) => {
    const { destination, origin, date, flighttype } = useFlightRouteDetails()
    const { segments, } = useFormattedFlightTimes(flight);
    const isMb = useIsMobile()
    const tabs = segments.map((s, idx) => {
        return (
            { id: idx, from: s.origin_code, to: s.destination_code }
        )
    })
    // const tabs = [
    //     { id: 0, from: 'DAM', to: 'DXB' },
    //     { id: 1, from: 'DXB', to: 'DAM' },
    // ];

    return (
        <div className="relative flex rounded-xl overflow-hidden border border-gray-200 bg-200">
            {/* Sliding background */}
            <div
                className="absolute top-0 bottom-0 w-1/2 bg-primary-1 rounded-xl transition-transform duration-300 ease-in-out"
                style={{
                    transform: `translateX(${activeTab * 100}%)`,
                }}
            />

            {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                    <button
                        key={tab.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            setActiveTab(tab.id);
                        }}
                        className={`relative flex-1 flex items-center justify-center gap-2 px-4 py-2 font-semibold transition-colors duration-300 ${isActive ? 'text-white' : 'text-500'
                            }`}
                    >
                        <span>{tab.from}</span>
                        <span><ArrowRight size={!isMb ? 24 : 18} />

                        </span>
                        <span>{tab.to}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default DetailsTab;
