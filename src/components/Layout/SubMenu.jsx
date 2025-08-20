'use client'
import React from 'react';
import { useRouter } from 'next/navigation';
import useIsArabic from '@/hooks/useIsArabic';

const SubMenu = ({ subLinks, isOpen, setHoveredItem }) => {
    const router = useRouter();
    const isArabic = useIsArabic();

    const handleClick = (link) => {
        if (link?.startsWith('http')) {
            window.open(link, '_blank');
        } else if (link?.startsWith('/')) {
            router.push(link);
        } else {
            // Do nothing
        }
    };

    if (!isOpen || subLinks.length === 0) return null;

    return (
        <div
            className={`absolute top-1/2 ${isArabic ? 'right-[108%]' : 'left-[108%]'} -translate-y-1/2 bg-main-light text-white 
${isArabic ? 'rounded-tl-md rounded-bl-md' : 'rounded-tr-md rounded-br-md'} 
p-3 w-[220px] shadow-lg z-50`}
            onMouseLeave={(e) => {
                e.stopPropagation()
                setHoveredItem(null)
            }}
        >
            {/* Arrow notch */}
            <div
                className={`absolute ${isArabic ? 'right-[-6px]' : 'left-[-6px]'} top-1/2 -translate-y-1/2 w-3 h-3 bg-main-light rotate-45`}
                style={{
                    borderRadius: '2px',
                }}
            ></div>

            {subLinks.map((sub, index) => (
                <button
                    key={sub.label}
                    onClick={() => handleClick(sub.link)}

                    className="cursor-pointer block w-full text-start px-4 py-2 text-[15px] font-medium hover:bg-secondary hover:text-white transition rounded-md"
                >
                    {sub.label}
                </button>
            ))}
        </div>
    );
};

export default SubMenu;
