'use client';
import useIsMobile from '@/hooks/useIsMobile';
import React from 'react';

const TimeCodeSkeleton = () => (
    <div className="flex flex-col items-center min-w-[50px]">
        <div className="h-6 w-14 bg-gray-300 rounded" />
        <div className="h-4 w-10 bg-gray-200 rounded mt-1" />
    </div>
);

const DurationDashedSkeleton = ({ isMb, isLg, isXl }) => {
    // Match real component logic
    const length = isXl ? 8 : isLg ? 6 : isMb ? 10 : 10;

    return (
        <div className="flex items-center justify-center flex-1 min-w-[100px]">
            {/* Start Dot */}
            <div className="w-2 h-2 bg-gray-300 rounded-full" />
            {/* Left Dashes */}
            <div className="flex gap-[4px] mx-[6px]">
                {Array.from({ length }).map((_, i) => (
                    <div key={`left-${i}`} className="w-[6px] h-[2px] bg-gray-300 rounded-sm" />
                ))}
            </div>
            {/* Center Icon */}
            <div className="mx-1 bg-gray-300 rounded-full flex items-center justify-center w-7 h-7">
                <div className="w-4 h-4 bg-gray-200 rounded" />
            </div>
            {/* Right Dashes */}
            <div className="flex gap-[4px] mx-[6px]">
                {Array.from({ length }).map((_, i) => (
                    <div key={`right-${i}`} className="w-[6px] h-[2px] bg-gray-300 rounded-sm" />
                ))}
            </div>
            {/* End Dot */}
            <div className="w-2 h-2 border border-gray-300 rounded-full" />
        </div>
    );
};

const SegmentSkeleton = ({ isMb, isLg, isXl }) => (
    <div className="flex items-center justify-between gap-2 w-full">
        <TimeCodeSkeleton />
        <DurationDashedSkeleton isMb={isMb} isLg={isLg} isXl={isXl} />
        <TimeCodeSkeleton />
    </div>
);

const FareCardSkeleton = () => (
    <div className="flex-1 h-20 bg-gray-300 rounded-lg min-w-[100px] max-w-[140px]" />
);

const SkeletonFlightCard = () => {
    const isMb = useIsMobile(768);
    const isLg = useIsMobile(1024);
    const isXl = useIsMobile(1280);

    return (
        <div className="w-full p-4 lg:py-8 lg:px-8 bg-100 rounded-[12px] border border-gray-200 animate-pulse">

            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">

                {/* Segments */}
                <div className="flex flex-col gap-4 flex-1 w-full">
                    <div className="h-4 w-28 bg-gray-300 rounded self-center" />
                    <SegmentSkeleton isMb={isMb} isLg={isLg} isXl={isXl} />
                    {/* <SegmentSkeleton isMb={isMb} isLg={isLg} isXl={isXl} /> */}
                    <div className="h-4 w-20 bg-gray-200 rounded mt-2" />
                </div>

                {/* Fare Cards */}
                <div className="flex gap-4 w-full lg:w-auto justify-center lg:justify-end">
                    <FareCardSkeleton />
                    <FareCardSkeleton />
                </div>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gray-200 my-4 lg:my-6" />

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-6 w-12 bg-gray-300 rounded" />
                    <div className="h-6 w-12 bg-gray-300 rounded" />
                </div>
                <div className="h-8 w-40 bg-gray-200 rounded-full" />
            </div>
        </div>
    );
};

export default SkeletonFlightCard;
