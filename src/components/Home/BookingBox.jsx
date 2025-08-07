'use client'
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
    AirplaneTakeoff,
    AirplaneLanding,
    ArrowsLeftRight
} from "@phosphor-icons/react";
import SwapIcon from "./SwapIcon";
import AirportModal from "./AirportModal";
import TripTypeSelector from "./TripTypeSelector";
import FromToSelector from "./FromToSelector";
import MilesToggle from "./MilesToggle";
import TabNavigation from "./TabNavigation";
import useIsMobile from "@/hooks/useIsMobile";
import FlightInfoInputs from "./FlightInfoInputs";
import SearchFlightsButton from "./SearchFlightsButton";
import { useFormik } from "formik";
import MobModal from "./Modals/MobModal";
import { Users, Calendar, X, Check, CalendarBlank } from "@phosphor-icons/react";
import useCities from "@/hooks/useCities";
import { useDispatch, useSelector } from "react-redux";
import { getFlightsService } from "@/store/Services/flightServices";
import { useRouter } from "next/navigation";
import { setAirports, setPos, setSearchParams } from "@/store/flightSlice";
import AirportList from "./AirportList";
import Guests from "./Guests";
import Dates from "./widget/Dates/Dates";
import SearchInput from "./SearchInput";
import ModalTitle from "./widget/ModalTitle";
import ModalFooter from "./widget/ModalFooter";
import InfoBoxes from "./widget/InfoBoxes";
const tabs = ["book", "manage", "flight status"];
const BookingBox = ({ flights, pos, isResultsPage }) => {
    const isMobile = useIsMobile()
    const dispatch = useDispatch()
    const router = useRouter()
    useEffect(() => {
        dispatch(setAirports(flights))
        dispatch(setPos(pos))
    }, [])


    const { airPorts } = useSelector(state => state.flights)

    const [cities, setCities] = useState([])



    const getCitiesArray = (type, iataSourceCode, search = "") => {
        const normalizedSearch = search.toLowerCase();

        const filtered = cities?.filter((c) => {
            const { airPortTranslations, iataCode } = c;
            const { airPortName, city, country } = airPortTranslations?.[0] || {};
            const matchesSearch = (
                airPortName?.toLowerCase().includes(normalizedSearch) ||
                city?.toLowerCase().includes(normalizedSearch) ||
                country?.toLowerCase().includes(normalizedSearch) ||
                iataCode?.toLowerCase().includes(normalizedSearch)
            );

            if (!matchesSearch) return false;

            if (type === "source") {
                return true; // all match
            }

            // Destination logic
            if (iataSourceCode === "DAM" || iataSourceCode === "ALP") {
                return iataCode !== "DAM" && iataCode !== "ALP";
            } else {
                return iataCode === "DAM" || iataCode === "ALP";
            }
        });

        return filtered || [];
    };





    const [activeTab, setActiveTab] = useState("book");
    const [showDesktopModal, setDesktopShowModal] = useState(false);
    const [showMobileModal, setShowMobileModal] = useState(false);
    const [minMonth, setMinMonth] = useState(new Date());
    const [selected, setSelected] = useState('Return');
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [sourceSearch, setSourceSearch] = useState("");
    const [destinationSearch, setDestinationSearch] = useState("");
    const sliderRef = useRef(null);

    const formatDate = (date) => {
        if (!(date instanceof Date)) return null;

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}T00:00:00`;
    };
    const formik = useFormik({
        enableReinitialize: false,
        initialValues: {
            source: '',
            destination: '',
            adults: 1,
            children: 0,
            infants: 0,
            promoCode: '',
            cabinClass: 'Economy',
            dateStart: '',
            dateEnd: '',
            type: 0,
            tripType: 'OneWay',
            nearby: false,
            hasClickCalendar: false,
            miles: false
        },
        onSubmit: (values) => {
            const {
                cabinClass,
                source,
                destination,
                dateStart,
                dateEnd,
                adults,
                children, infants, type, nearby, tripType

            } = values;
            const formattedDeparture = formatDate(dateStart);
            const formattedReturn = formatDate(dateEnd);
            const flightclass = cabinClass === 'Economy' ? 'Y' : 'C'
            const data = {
                origin_id: source,

                destination_id: destination
                ,
                date: formattedDeparture,
                adults: adults,
                children: children,
                infants: infants,
                flightclass: flightclass,
                flighttype: tripType,
                pos_id: 0,
                neirby: nearby
            }
            if (tripType !== 'OneWay' && formattedReturn) {
                data.date_return = formattedReturn;
            }
            dispatch(setSearchParams(data))
            if (!dateStart || !source || !destination) {
                return
            }
            router.push('/search-results');



        }



    });

    const getCityString = (val, type) => {
        const city = airPorts?.items?.find(c => c.id === val);

        const text = type === 's' ? 'Departure: ' : "Destenation: "
        // return city ? `${text}${city.iataCode}` : '';
        return city ? `${city.airPortTranslations[0].country},${city.iataCode}` : '';
    };

    const getGuestSummary = () => {
        const { adults, children, infants, type } = formik.values;
        const parts = [];
        if (adults > 0) parts.push(`${adults}ADT`);
        if (children > 0) parts.push(`${children}CHD`);
        if (infants > 0) parts.push(`${infants}INF`);
        if (type === 2 || type === 3) {
            // Always show full parts summary when on Guests tab
            return parts.length > 0 ? parts.join(', ') : 'No guests selected';
        }

        // If not on Guests tab, show only when values are not default
        if (adults !== 1 || children !== 0 || infants !== 0) {
            return parts.join(', ');
        }

        return 'Add Guest';
    };


    const source = getCityString(formik.values.source, 's');
    const destination = getCityString(formik.values.destination, 'd');
    const stepsData = [
        { icon: <AirplaneTakeoff size={20} />, title: "Flying from", value: source, id: 0 },
        { icon: <AirplaneLanding size={20} />, title: "Flying to", value: destination, id: 1 },
        { icon: <Users size={20} />, title: "Guests", value: getGuestSummary(), id: 2 },
        { icon: <CalendarBlank size={20} />, title: "Travel when", value: "Check Date", id: 3 },
    ];
    const activeFlightTab = formik.values.type;

    const sliderSettings = {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 1000, // 1 second
        slidesToShow: 2, centerPadding: "20px", // or "10%"

        slidesToScroll: 1, cssEase: 'ease-in-out',

        responsive: [
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2.5,
                },
            },
        ],
    };

    const isStepValid = (stepId) => {
        const { source, destination, adults, children, infants, dateStart } = formik.values;

        switch (stepId) {
            case 0: // Going to "Flying to"
                return !!source;
            case 1: // Going to "Guests"
                return !!source && !!destination;
            case 2: // Going to "Travel when"
                return !!source && !!destination && (adults > 0 || children > 0 || infants > 0);
            default:
                return true;
        }
    };
    const handleClick = (id) => {
        const currentStep = formik.values.type;

        if (id > currentStep && !isStepValid(currentStep)) {
            return;
        }

        formik.setFieldValue("type", id);

        // Move the slider
        if (sliderRef.current) {
            sliderRef.current.slickGoTo(id);
        }
    };
    const handleReset = () => {
        formik.setFieldValue("dateStart", null);
        formik.setFieldValue("dateEnd", null);
        formik.setFieldValue('hasClickCalendar', false);

        setMinMonth(new Date())
    };
    const handleDateSelect = (value) => {
        console.log('value', value);
        const tripType = formik.values.tripType;

        if (tripType === 'OneWay') {
            // Handle OneWay: Set dateStart and clear dateEnd
            if (value instanceof Date) {
                const existing = formik.values.dateStart
                    ? new Date(formik.values.dateStart).toDateString()
                    : null;
                const selected = new Date(value).toDateString();

                if (existing === selected) return; // skip if same day

                formik.setFieldValue('dateStart', value);
                formik.setFieldValue('dateEnd', '');
            }
        }
        else {
            const { hasClickCalendar, dateStart } = formik.values;

            if (!hasClickCalendar) {
                // First click → set start date
                formik.setFieldValue('dateStart', value instanceof Date ? value : value.from || value);
                formik.setFieldValue('dateEnd', '');
                formik.setFieldValue('hasClickCalendar', true);
            }
            else {
                // Second click → set end date (allow same day)
                if (value instanceof Date) {
                    formik.setFieldValue('dateEnd', value);
                } else if (value?.to) {
                    formik.setFieldValue('dateEnd', value.to);
                } else {
                    // If same day as start
                    formik.setFieldValue('dateEnd', dateStart);
                }

                // Reset for next time
                formik.setFieldValue('hasClickCalendar', false);
            }
        }
    };

    const onClose = () => {
        if (isMobile) {
            setShowMobileModal(false)
        } else {
            setDesktopShowModal(false)
        }
    }

    const handleSearch = (searchValue, type) => {
        const key = type === 'source' ? 'source' : 'destination';
        if (searchValue === '') formik.setFieldValue(key, '');
        type === 'source' ? setSourceSearch(searchValue) : setDestinationSearch(searchValue);
    };

    useEffect(() => {
        const updateSearch = (key, setSearch) => {
            const city = airPorts?.items?.find((a) => a.id === formik.values[key]);
            const name = city?.airPortTranslations?.[0]?.airPortName ?? '';
            setSearch(name);
        };

        updateSearch('source', setSourceSearch);
        updateSearch('destination', setDestinationSearch);
    }, [formik.values.source, formik.values.destination, airPorts.items]);

    useEffect(() => {
        if (airPorts?.items?.length > 0) {
            setCities(airPorts.items)
        }
    }, [airPorts])


    const { type } = formik.values;

    const renderStepComponent = () => {
        const { type } = formik.values;

        if (type === 0 || type === 1) {
            const isSource = type === 0;
            return (
                <>
                    <SearchInput
                        search={type === 0 ? sourceSearch : destinationSearch}
                        handleSearch={handleSearch}
                        onClose={onClose}
                        placeholder={type === 0 ? "Search for airport or city" : "To"}
                        type={type === 0 ? "source" : "destination"}
                        values={formik.values}
                        airPorts={airPorts.items}
                    />
                    <AirportList
                        type={isSource ? "source" : "destination"}
                        values={formik.values}
                        setFieldValue={formik.setFieldValue}

                        getCitiesArray={getCitiesArray}
                        isMobile={isMobile}
                        sliderRef={sliderRef}
                        search={type === 0 ? sourceSearch : destinationSearch}
                        setSearch={isSource ? setSourceSearch : setDestinationSearch}
                    />
                </>
            );
        }

        if (type === 2) {
            return <Guests formik={formik} values={formik.values} isMobile={isMobile} />;
        }

        if (type === 3) {
            return (
                <Dates
                    formik={formik}
                    minMonth={minMonth}
                    setMinMonth={setMinMonth}
                    setCurrentMonth={setCurrentMonth}
                    currentMonth={currentMonth}
                    handleDateSelect={handleDateSelect}
                    handleReset={handleReset}
                />
            );
        }

        return null;
    };


    const handleSwitch = () => {
        formik.setValues({
            ...formik.values,
            source: formik.values.destination,
            destination: formik.values.source,
        });
    };

    const [openDropdown, setOpenDropdown] = useState(null);
    const [openAirPortsDropdown, setOpenAirPortsDropdown] = useState(null);


    const MobileView = () => (
        <div id="search-widget" className="  w-full">
            <TabNavigation
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isMobile={false}
                formik={formik}

            />
            <TripTypeSelector values={formik.values}
                setFieldValue={formik.setFieldValue}
                handleReset={handleReset}

            />
            <FromToSelector
                // setShowModal={setDesktopShowModal}
                setShowModal={setDesktopShowModal}
                setShowMobileModal={setShowMobileModal}
                cities={cities}
                isMobile
                values={formik.values}
                handleSwitch={handleSwitch}

            />

            <FlightInfoInputs formik={formik} setShowMobileModal={setShowMobileModal}
            />
            <SearchFlightsButton handleSubmit={formik.handleSubmit} values={formik.values} />
            <MilesToggle
                isMobile={isMobile}
                miles={formik.values.miles}
                setFieldValue={formik.setFieldValue}

            />



        </div>
    );
    const DesktopView = () => (
        <div id="search-widget" className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl mx-auto mt-[-130px] relative z-20 ">
            {!isResultsPage &&
                <TabNavigation
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isMobile={false}
                    formik={formik}
                />
            }
            {isResultsPage && (
                <ModalTitle />
            )}

            <div className="flex items-center justify-between mb-6">
                <TripTypeSelector values={formik.values}
                    setFieldValue={formik.setFieldValue}
                    handleReset={handleReset}
                />
                <MilesToggle isMobile={isMobile} />
            </div>
            <FromToSelector
                setShowModal={setDesktopShowModal}
                setShowMobileModal={setShowMobileModal}
                cities={cities}
                values={formik.values}
                handleSwitch={handleSwitch}
                isResultsPage={isResultsPage}
                openAirPortsDropdown={openAirPortsDropdown}
                setOpenAirPortsDropdown={setOpenAirPortsDropdown}
                AirPortsSourceComponent={
                    <>
                        <SearchInput
                            search={sourceSearch}
                            handleSearch={handleSearch}
                            onClose={onClose}
                            placeholder={"Search for airport or city"}
                            type={"source"}
                            values={formik.values}
                            airPorts={airPorts.items}
                        />
                        <AirportList
                            type={"source"}
                            values={formik.values}
                            setFieldValue={formik.setFieldValue}

                            getCitiesArray={getCitiesArray}
                            isMobile={isMobile}
                            sliderRef={sliderRef}
                            search={sourceSearch}
                            setSearch={setSourceSearch}
                            setOpenAirPortsDropdown={setOpenAirPortsDropdown}
                        />
                    </>
                }
                AirPortsDestenationComponent={
                    <>
                        <SearchInput
                            search={destinationSearch}
                            handleSearch={handleSearch}
                            onClose={onClose}
                            placeholder={"To"}
                            type={"destination"}
                            values={formik.values}
                            airPorts={airPorts.items}
                        />
                        <AirportList
                            type={"destination"}
                            values={formik.values}
                            setFieldValue={formik.setFieldValue}

                            getCitiesArray={getCitiesArray}
                            isMobile={isMobile}
                            sliderRef={sliderRef}
                            search={destinationSearch}
                            setSearch={setDestinationSearch}
                        />
                    </>
                }

            />
            {isResultsPage && <InfoBoxes
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                guestsComponent={<Guests formik={formik} values={formik.values} isMobile={isMobile} isResultsPage={isResultsPage} />}
                CalendarComponent={<Dates
                    formik={formik}
                    minMonth={minMonth}
                    setMinMonth={setMinMonth}
                    setCurrentMonth={setCurrentMonth}
                    currentMonth={currentMonth}
                    handleDateSelect={handleDateSelect}
                    handleReset={handleReset}
                    isResultsPage={isResultsPage}
                />}


            />

            }
            {isResultsPage && (
                <ModalFooter
                    setFieldValue={formik.setFieldValue}
                    values={formik.values}
                />
            )}
            <AirportModal
                key={showMobileModal ? 'open' : 'closed'}

                isOpen={showDesktopModal}
                onClose={onClose}
                formikValues={formik.values}
                setFieldValue={formik.setFieldValue}
                handleSubmit={formik.handleSubmit}
                stepsData={stepsData}
                handleClick={handleClick}
                renderStepComponent={renderStepComponent}
                setCurrentMonth={setCurrentMonth}
            />
        </div>
    );

    useEffect(() => {
        if (showDesktopModal) {
            setShowMobileModal(false);
        }
    }, [showDesktopModal]);

    useEffect(() => {
        if (showMobileModal) {
            setDesktopShowModal(false);
        }
    }, [showMobileModal]);



    return (
        <>
            {isMobile ? <MobileView /> : <DesktopView />}
            <MobModal
                key={showMobileModal ? 'open' : 'closed'}
                isOpen={showMobileModal}
                onClose={onClose}
                title="Departure"
                stepsData={stepsData}
                formik={formik}
                values={formik.values}

                activeTab={activeFlightTab}
                handleClick={handleClick}
                sliderSettings={sliderSettings}
                sliderRef={sliderRef}
                handleReset={handleReset}
                renderStepComponent={renderStepComponent}
            />
        </>

    );

};

export default BookingBox;
