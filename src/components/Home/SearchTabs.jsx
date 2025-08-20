'use client';
import useIsArabic from '@/hooks/useIsArabic';
import React, { useState } from 'react';

export default function SearchTabs({ onClose, activeTab, setActiveTab, tabs, formik, validateTabFields }) {
    const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);
    const isArabic = useIsArabic()
    return (
        <div className=" relative px-4 py-4 bg-white rounded-[20.77px] shadow-lg w-full max-w-6xl mx-auto overflow-x-auto">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-1 right-1 text-main text-2xl cursor-pointer"
            >
                ×
            </button>

            {/* Tabs Container */}
            <div className="hidden lg:flex flex-wrap md:flex-nowrap items-center justify-start gap-4 min-w-[380px]">
                {tabs.map((tab, index) => {
                    const isSelected = index <= activeIndex;
                    const Icon = tab.icon;
                    const rotateIcon = isArabic && (tab.id === 0 || tab.id === 1); // departure or arrival

                    return (
                        <div key={tab.id} className="flex items-center gap-4 w-full sm:w-[calc(50%-8px)] md:w-auto">
                            {/* Tab Box */}
                            <div
                                onClick={() => {
                                    if (!validateTabFields(activeTab, formik.values)) return;
                                    setActiveTab(tab.id)
                                }}
                                className="cursor-pointer flex flex-1 min-w-[200px] md:w-[220px] rounded-[30px] overflow-hidden shadow-md"
                            >
                                {/* Icon */}
                                <div
                                    className={`flex items-center justify-center w-1/3 py-5 transition-colors duration-500 ${isSelected ? 'bg-main' : 'bg-gray-800'}`}
                                >
                                    <Icon style={{
                                        transform: isArabic ? 'scaleX(-1)' : 'none',
                                        transition: 'transform 0.3s',
                                    }} className="text-white text-xl md:text-2xl" />
                                </div>

                                {/* Text */}
                                <div
                                    className={` flex flex-col justify-center px-4 py-4 w-2/3 transition-colors duration-500 ${isSelected ? 'bg-secondary' : 'bg-gray-600'}`}
                                >
                                    <span className="text-white text-sm font-semibold text-start">{tab.title}</span>
                                    <span className="text-white/70 text-xs text-start">{tab.subtitle}</span>
                                </div>
                            </div>

                            {/* Dashed Line (only desktop) */}
                            {index < tabs.length - 1 && (
                                <div className="hidden md:block xl:block w-5 h-px border-t border-dashed border-gray-600 flex-shrink-0" />
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="flex lg:hidden items-center justify-between gap-2 flex-wrap">
                {tabs.map((tab, index) => {
                    const isSelected = index <= activeIndex;
                    const Icon = tab.icon;

                    return (
                        <React.Fragment key={tab.id}>
                            <div className="flex flex-col items-center">
                                <button
                                    onClick={() => {
                                        if (!validateTabFields(activeTab, formik.values)) return;
                                        setActiveTab(tab.id)
                                    }} className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors duration-300 shadow-md ${isSelected ? 'bg-main' : 'bg-gray-700'
                                        }`}
                                >
                                    <Icon className="text-white text-xl" />
                                </button>

                            </div>
                            {/* Dashed line for mobile */}
                            {index < tabs.length - 1 && (
                                <div className="hidden xl:block md:block md:w-10 xl:w-12 h-px border-t border-dashed border-gray-400" />
                            )}

                        </React.Fragment>
                    );
                })}
            </div>


        </div>
    );
}
