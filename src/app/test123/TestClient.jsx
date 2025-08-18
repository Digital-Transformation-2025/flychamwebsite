'use client'

import useIsMobile from '@/hooks/useIsMobile'
import React, { useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation';

import BookingBox from '@/components/Home/BookingBox'
import { useDispatch, useSelector } from 'react-redux';
import { setAirports, setPos } from '@/store/flightSlice';
const TestClient = ({ flights, pos}) => {
    const isMobile = useIsMobile(1024);
    const router = useRouter()
    const { t } = useTranslation()
    const handleNavigate = () => {
        router.push('/destenations')
    }
    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(setAirports(flights))
        dispatch(setPos(pos))
    }, [])

    const { airPorts } = useSelector(state => state.flights)

    const [cities, setCities] = useState([])
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (airPorts?.items?.length > 0) {

            setCities(airPorts.items)
        }
    }, [airPorts])
    const getCitiesArray = (type, iataSourceCode, search = "") => {
        const allCities = airPorts?.items || [];
        const normalizedSearch = search.toLowerCase();

        let baseFilteredCities = allCities.filter((c) => {
            const iataCode = c.iataCode;

            if (type === "destination") {
                const isFromDamOrAlp = iataSourceCode === "DAM" || iataSourceCode === "ALP";

                if (isFromDamOrAlp) {
                    return iataCode !== "DAM" && iataCode !== "ALP";
                } else {
                    return iataCode === "DAM" || iataCode === "ALP";
                }
            }

            return true; // source → allow all
        });

        return baseFilteredCities.filter((c) => {
            const { iataCode, airPortTranslations } = c;
            const { airPortName = "", city = "", country = "" } = airPortTranslations?.[0] || {};

            return (
                airPortName.toLowerCase().includes(normalizedSearch) ||
                city.toLowerCase().includes(normalizedSearch) ||
                country.toLowerCase().includes(normalizedSearch) ||
                iataCode.toLowerCase().includes(normalizedSearch)
            );
        });
    };




    return (
        <div className="transition-all duration-700">

            <div className="">
                <div className="w-[90%] mt-50 md:w-[70%] mx-auto">

                    <BookingBox getCitiesArray={getCitiesArray} setCities={setCities} cities={cities} airPorts={airPorts}
                        search={search}
                        setSearch={setSearch}

                    />                </div>
            </div>
        </div>
    )
}

export default TestClient