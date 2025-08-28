import { CaretDown, CaretUp } from '@phosphor-icons/react';
import React, { useState, useRef, useEffect } from 'react';

const PricingAccordion = ({ pricingInfo }) => {
    const [openTypes, setOpenTypes] = useState({}); // ✅ multiple open
    const [heights, setHeights] = useState({});
    const contentRefs = useRef({});

    const toggleAccordion = (type) => {
        setOpenTypes((prev) => ({
            ...prev,
            [type]: !prev[type],
        }));
    };

    const getLabel = (type) => {
        switch (type) {
            case 'ADT': return 'Adult';
            case 'CHD': return 'Child';
            case 'INF': return 'Infant';
            default: return type;
        }
    };

    useEffect(() => {
        const newHeights = {};
        pricingInfo?.forEach((item) => {
            const el = contentRefs.current[item.type];
            if (el) newHeights[item.type] = el.scrollHeight;
        });
        setHeights(newHeights);
    }, [pricingInfo]);

    return (
        <div className="text-sm space-y-2">
            {pricingInfo?.map((item, idx) => {
                const isOpen = openTypes[item.type]; // ✅ support multiple

                return (
                    <div key={idx} className=" pb-2">
                        {/* Accordion Header */}
                        <div
                            className={`flex justify-between items-center cursor-pointer text-[#000] text-[16px] font-medium py-2
                            ${idx !== 0 && 'border-t border-[#E5E5E3]'}`}
                            onClick={() => toggleAccordion(item.type)}
                        >
                            <span>Per {getLabel(item.type) } (2)</span>
                            <span className="text-sm text-secondary">
                                {isOpen ? <CaretUp size={18} /> : <CaretDown size={18} />}
                            </span>
                        </div>

                        {/* Accordion Content with Transition */}
                        <div
                            ref={(el) => (contentRefs.current[item.type] = el)}
                            className="transition-all duration-300 ease-in-out overflow-hidden "
                            style={{
                                maxHeight: isOpen ? `${heights[item.type] || 0}px` : '0px',
                            }}
                        >
                            <div className="space-y-1 mt-2 pl-1 pt-1">
                                <div className="flex justify-between">
                                    <span className="text-200">Ticket price</span>
                                    <span className="text-200">{item.ticketPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-600">Taxes</span>
                                    <span className="text-[#B00300]">{item.taxes}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-600">Penalty</span>
                                    <span className="text-[#B00300]">{item.pentaly}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-600">Payment getaway fees</span>
                                    <span className="text-[#B00300]">{item.paymaneyGetwayFees}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default PricingAccordion;
