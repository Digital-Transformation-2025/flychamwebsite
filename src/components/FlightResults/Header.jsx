'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ArrowRight,
  ArrowsLeftRight,
  CalendarBlank,
  MagnifyingGlass,
  UserCircle,
  Users,
} from '@phosphor-icons/react';

import logo from '@/assets/images/logoblue.png';
import formatDateReadble from '@/util/formatDateReadble';
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails';
import useIsMobile from '@/hooks/useIsMobile';

const Header = () => {
  const { searchParams, airPorts } = useSelector((state) => state.flights);
  const { date, adults, children, infants, origin_id, destination_id } = searchParams;
  const airPortsItems = airPorts?.items || [];

  const origin = airPortsItems.find(a => a.id === origin_id);
  const destination = airPortsItems.find(a => a.id === destination_id);

  const { i18n } = useTranslation();
  const lang = i18n.language;
  const isLg = !useIsMobile(1024);

  const { iataCode: fromCode, airPortTranslations = [] } = origin || {};
  const { iataCode: toCode } = destination || {};
  const { city = '', country = '' } = airPortTranslations.find(a => a.languageCode === lang) || {};

  const { flighttype, dateReturn } = useFlightRouteDetails();

  const labelClass = 'text-primary-1 text-base font-normal';
  const passNum = adults + children + infants;

  return (
    <header className="flex w-full h-[69px] justify-center items-center gap-6 shrink-0 bg-100 max-md:h-auto max-md:py-3">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-6 w-full max-w-[1400px] justify-between">

        {/* Logo */}
        <Link href="/" passHref className="flex items-center">
          <div className="cursor-pointer flex w-[180px] items-center p-2">
            <Image src={logo} alt="FlyCham Logo" width={180} height={50} className="object-contain" />
          </div>
        </Link>

        {/* Trip Info */}
        <div className="flex h-14 items-center gap-3.5 py-3 rounded-xl max-md:flex-col max-md:w-full max-md:h-auto flex-1 justify-center">

          {/* From - To */}
          <div className="flex items-center gap-3 p-2.5 max-md:flex-col max-md:w-full ">
            <div className="flex items-center gap-2 max-md:justify-center ">
              <span className={labelClass}>{fromCode}</span>
            </div>

            <div className="flex flex-col items-center">
              {flighttype === "OneWay" && (
                <ArrowRight size={isLg ? 18 : 20} className="text-primary-1" />
              )}
              {flighttype === "Return" && (
                <ArrowsLeftRight size={isLg ? 18 : 20} className="text-primary-1" />
              )}
            </div>

            <span className={labelClass}>{toCode}</span>
          </div>

          <div className="w-px h-[33px] bg-[var(--text-600)] max-lg:w-full max-lg:h-px" />

          {/* Dates */}
          <div className="flex flex-col xl:flex-row items-center gap-1.5 xl:p-2.5">
            <CalendarBlank size={25} className="hidden xl:block text-primary-1" />
            <span className={labelClass}>{formatDateReadble(date)}</span>
          </div>

          {flighttype === "Return" && (
            <>
              <span>-</span>
              <div className="flex flex-col xl:flex-row items-center gap-1.5 xl:p-2.5">
                <CalendarBlank size={25} className="hidden xl:block text-primary-1" />
                <span className={labelClass}>{formatDateReadble(dateReturn)}</span>
              </div>
            </>
          )}

          <div className="w-px h-[33px] bg-[var(--text-600)] max-lg:w-full max-lg:h-px" />

          {/* Passengers */}
          <div className="flex flex-col xl:flex-row items-center gap-2.5 xl:p-2.5">
            <Users size={25} className="hidden xl:block text-primary-1" />
            <span className={labelClass}>{`Passengers: ${passNum}`}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="flex h-[51px] items-center gap-1 bg-secondary-1 px-2.5 py-[5px] rounded-lg hover:bg-[#A89770] transition-colors text-[#FDFDFC] font-bold max-sm:w-full max-sm:justify-center">
            <MagnifyingGlass size={25} color="#FFF" />
            <span>Modify search</span>
          </button>
          <UserCircle size={25} className="text-500 cursor-pointer text-primary-1" />
        </div>
      </div>
    </header>
  );
};

export default Header;
