'use client'
import React from 'react';
import { usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setActiveTab } from '@/store/flightSlice';

const TabNavigation = ({ tabs, activeTab, isMobile }) => {
  const pathname = usePathname();
  const dispatch = useDispatch()
  const handleTabClick = (tab) => {
    // if (pathname === '/test123') {
    //   dispatch(
    //     setActiveTab(tab)
    //   )
    // }
    if (tab !== 'flight status') {

      dispatch(

        setActiveTab(tab)
      )
    }

  };

  return (
    <div
      className={`flex my-2 gap-6 ${isMobile ? 'justify-between' : 'justify-start'
        } items-center border-b border-[#E5E5E3] mb-6`}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            // disabled={pathname !== '/test123'}
            className={`cursor-pointer capitalize px-4 ${isMobile ? 'py-4' : 'py-2'
              } text-sm font-semibold border-b-2 transition-colors duration-400 
              ${isActive
                ? 'text-main border-main'
                : 'text-gray-400 border-transparent hover:text-gray-500'
              }
             `
            }
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
