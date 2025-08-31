import React, { useEffect, useRef, useState } from 'react'

const LegTabs = ({ legs, activeId, onChange }) => {
    const containerRef = useRef(null);
    const [indicatorStyle, setIndicatorStyle] = useState({ id: 'out', label: 'DAM → DXB' });

    useEffect(() => {
        const activeBtn = containerRef.current?.querySelector(
            `[data-id="${activeId}"]`
        );
        if (activeBtn) {
            const rect = activeBtn.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            setIndicatorStyle({
                width: rect.width,
                left: rect.left - containerRect.left,
            });
        }
    }, [activeId, legs]);

    return (
        <div className="mt-3 border-b border-[#EAEAE8] ">
            <div
                ref={containerRef}
                className="relative flex gap-8 justify-center md:justify-start"
            >
                {legs.map((leg) => {
                    const active = leg.id === activeId;
                    return (
                        <button
                            key={leg.id}
                            type="button"
                            data-id={leg.id}
                            onClick={() => onChange(leg.id)}
                            className={`relative py-3 text-[16px] md:text-[20px] w-[221px] font-semibold transition-colors ${active ? "text-primary-1" : "text-500"
                                }`}
                        >
                            {leg.label}
                        </button>
                    );
                })}

                {/* Animated underline indicator */}
                <span
                    className="absolute -bottom-[1px] h-[3px] bg-primary-1 rounded-full transition-all duration-300"
                    style={{
                        width: indicatorStyle.width,
                        left: indicatorStyle.left,
                    }}
                />
            </div>
        </div>
    );
};

export default LegTabs