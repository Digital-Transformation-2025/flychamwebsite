'use client'
import React, { useEffect, useRef, useState } from 'react'
import DateNavigation from '@/components/FlightResults/DateNavigation'
import Header from '@/components/FlightResults/Header'
import ProgressBar from '@/components/FlightResults/ProgressBar'
import RouteInfo from '@/components/FlightResults/RouteInfo'
import HeaderMobile from '@/components/FlightResults/HeaderMobile'
import Section from '@/components/FlightResults/Section'
import FlighSelectStep from '@/components/FlightResults/FlighSelectStep/FlighSelectStep'
import Divider from '@/components/FlightResults/FlighSelectStep/Divider'
import PassengerDetails from '@/components/FlightResults/PassengerDetails/PassengerDetails'
import Payment from '@/components/FlightResults/PaymentStep/Payment'
import { useDispatch, useSelector } from 'react-redux'
import { setFormikData, setPnr, setSearchParams, setSelectedF, setSelectedpassengers, setSelectedPlan } from '@/store/flightSlice'
import { createListPassengerService, createPaymentService, getFlightsService } from '@/store/Services/flightServices'
import NoResults from '@/components/FlightResults/NoResults'
import SessionExpiredModal from '@/components/FlightResults/SessionExpiredModal'
import POSNotice from '@/components/FlightResults/POSNotice'
import PosSelectorModal from '@/components/FlightResults/FlighSelectStep/PosSelectorModal'
import useSessionTimer from '@/hooks/useSessionTimer'
import AlertModal from '@/components/FlightResults/AlertModal'
import LottieComponent from '@/components/Ui/LottieComponent'
import { useFormik } from 'formik'
import { contactSchema, passengerSchema } from '@/util/validatonSchemas'
import * as Yup from 'yup';
import useFlightDetails from '@/hooks/useFlightDetails'
import useScrollToTop from '@/hooks/useScrollToTop'
import useFetchFlights from '@/hooks/useFetchFlights'
import ModifySearchModal from '@/components/FlightResults/ModifySearchModal'
import SummaryMobileBox from '@/components/FlightResults/PassengerDetails/SummaryMobileBox'
import Summary from '@/components/FlightResults/PassengerDetails/Summary'
import SkeletonFlightCard from '@/components/FlightResults/FlighSelectStep/SkeletonFlightCard'
import { useRouter } from 'next/navigation'
const FlightResultsClient = ({ pos = [], airPorts = [] }) => {
    const router = useRouter()

    const scrollRef = useRef(null)

    const dispatch = useDispatch()
    const { flights, selectedPassengers, searchParams, isLoadingFlights, selectedPlan, IndirectAirPort, formikData } = useSelector((state) => state.flights);
    const NonEmptySearch = (flights?.length > 0 || IndirectAirPort.length > 0)
    const { adults, children, infants } = formikData;
    const passengerNumber = adults + children + infants
    const { info } = useFlightDetails(selectedPlan);

    const [showNoice, setShowNotice] = useState(true);
    const [showPosModal, setShowPosModal] = useState(false);
    const [localLoading, setLocalLoading] = useState(true);
    const [isSessionModalOpen, setSessionModalOpen] = useState(false);
    const [isModifySearchOpen, setIsModifySearchOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);

    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [isShowDetailsModalOpen, setFlightDetailsOpen] = useState(false);
    const [expandedFlight, setExpandedFlight] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [isPageLoaded, setIsPageLoaded] = useState(true);

    useScrollToTop(scrollRef, [activeStep, selectedFlight]);
    useFetchFlights(setLocalLoading, setIsPageLoaded);


    const { restartTimer } = useSessionTimer({
        duration: passengerNumber >= 3 ? 60 * 10 : 60 * 7,
        onExpire: () => setSessionModalOpen(true),
    });

    const handleDetailsClick = (flight) => {
        setExpandedFlight(flight);
        setFlightDetailsOpen(true);

    };
    const handleStepBack = () => {
        // Make sure we don't go below step 0
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };
    const handleResetToFirstStep = () => {
        setActiveStep(0)
        setSelectedFlight(null)
        setSelectedFlight({})
        dispatch(setSelectedPlan([]))

    }




    const handleSelectPlan = (event, flight, col) => {
        event.stopPropagation(); // Prevent bubbling
        dispatch(setSelectedF(flight))
        dispatch(setSelectedPlan(col))

        setSelectedFlight(flight);
        setSelectedType(col);
    };
    const handlePayment = () => {
        const info = selectedType[selectedType.type]
        const data = {
            bookingInfo: {
                transactionId: info.transaction_id,
                travelers: selectedFlight.common_info.travelers,
                segments: selectedFlight.common_info.segments.map((s) => {
                    return {
                        originCode: s.origin_code,
                        destinationCode: s.destination_code,
                        departureDate: s.departure_date,
                        departureTime: s.departure_time,
                        arrivalDate: s.arrival_date,
                        arrivalTime: s.arrival_time,
                        rph: s.rph,
                        journeyDuration: s.journey_duration,
                        flightNumber: s.FlightNumber,
                    }
                }),
                flightClass: selectedType.type === "Economy" ? "Y" : "C",
                paymentAmount: info.total_fare_USD,
                posId: selectedType.commonInfo.pos_id
                ,
                flightType: selectedFlight.common_info.flight,
                ContactInfo: selectedPassengers,


            },
            stripeInfo: {
                Amount: Number(info.total_fare),
                Currency: selectedPlan.commonInfo.currency.toLowerCase(),
                Description:
                    `${selectedFlight.common_info.segments[0].origin_code}_${selectedFlight.common_info.segments[0].destination_code}_${selectedFlight.common_info.flight}`
            },
            PassengerInfo: selectedPlan?.PassengerInfo,


        }

        dispatch(createPaymentService(data)).then(action => {
            if (createPaymentService.fulfilled.match(action)) {
                const { checkoutUrl, pnr } = action.payload;
                if (pnr) dispatch(setPnr(pnr));
                dispatch(setSearchParams({}))
                dispatch(setFormikData({}))
                // router.push("/")
                checkoutUrl ? window.open(checkoutUrl, '_self') : console.error("Checkout URL not found");
            } else if (createPaymentService.rejected.match(action)) {
                const status = action.payload?.status || action.error?.status;
                // alert(status === 400 ? "There was a problem with your request. Please try again." : "Something went wrong. Please try again later.");
            }
        });



    }
    const handleClickDate = (type) => {

        const originalDate = new Date(searchParams.date + 'Z'); // treat as UTC
        const dateReturn = searchParams.date_return ? new Date(searchParams.date_return + 'Z') : null;

        const year = originalDate.getUTCFullYear();
        const month = originalDate.getUTCMonth();
        const day = originalDate.getUTCDate();

        const delta = type === "next" ? 1 : -1;
        const adjustedDate = new Date(Date.UTC(year, month, day + delta));
        if (dateReturn && adjustedDate > dateReturn) return;

        const formattedDateOnly = `${adjustedDate.getUTCFullYear()}-${String(adjustedDate.getUTCMonth() + 1).padStart(2, '0')}-${String(adjustedDate.getUTCDate()).padStart(2, '0')}`;
        const formattedFullDate = `${formattedDateOnly}T00:00:00`;


        dispatch(setSearchParams({ ...searchParams, date: formattedFullDate }));
        // loadFlightsWithDelay({ date: formattedFullDate });
    };

    // Build passengers array when counts change
    useEffect(() => {
        let globalIndex = 0;
        const passengers = [
            { type: 'adult', count: adults, typeValue: 'ADT' },
            { type: 'child', count: children, typeValue: 'CHD' },
            { type: 'infant', count: infants, typeValue: 'INF' },
        ]
            .filter(p => p.count > 0)
            .flatMap(p =>
                Array.from({ length: p.count }, () => ({
                    idx: globalIndex++,
                    type: p.type,
                    typeValue: p.typeValue,
                    firstName: '',
                    lastName: '',
                    dateOfBirth: '',
                    title: '',
                }))
            );

        // ✅ Update Formik passengers field
        formik.setFieldValue("passengers", passengers);
    }, [adults, children, infants]);



    const formik = useFormik({
        initialValues: {
            passengers: {},
            contact: {
                countryCode: '',
                phoneNumber: '',
                email: '', emailError: '',
                passengerIndex: '',
                CountryCodeMobileNumber: '',
                MobileNumber: '',
            },
            save: false,
            accept: false,
            recive: false
        },
        validationSchema: Yup.object().shape({
            passengers: Yup.array()
                .of(passengerSchema)
                .test('unique-names', 'Passenger names must be unique.', function (passengers = []) {
                    const seen = new Set();
                    for (const p of passengers) {
                        const fullName = `${p.firstName?.trim().toLowerCase()} ${p.lastName?.trim().toLowerCase()}`;
                        if (seen.has(fullName)) {
                            return this.createError({
                                message: `Duplicate name found: ${fullName}. Each passenger must have a unique name.`,
                            });
                        }
                        seen.add(fullName);
                    }
                    return true;
                }), contact: contactSchema,
            accept: Yup.boolean()
                .oneOf([true], 'You must accept the terms.'),
        }),
        context: { activeField: '' },
        // validateOnChange: true,
        // validateOnBlur: true,
        onSubmit: (values) => {
            const contactDetails = values.passengers[values.contact.passengerIndex];

            const capitalize = (str) =>
                typeof str === 'string' && str.length > 0
                    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                    : '';

            const { title, dateOfBirth, firstName, lastName } = contactDetails;

            const data = {
                title,
                firstName: capitalize(firstName),
                lastName: capitalize(lastName),
                // main phone
                phoneNumber: values.contact.phoneNumber,
                countryCode: values.contact.countryCode,
                // alt phone number
                ...(values.contact.CountryCodeMobileNumber && {
                    CountryCodeMobileNumber: values.contact.CountryCodeMobileNumber,
                }),
                ...(values.contact.MobileNumber && {
                    MobileNumber: values.contact.MobileNumber,
                }),

                email: values.contact.email,
                passengers: values.passengers.map((p) => ({
                    birthDate: p.dateOfBirth,
                    passengerTypeCode: p.typeValue,
                    givenName: capitalize(p.firstName),
                    surname: capitalize(p.lastName),
                    nameTitle: p.title,
                })),
                pricinginfo: info.pricing_info.map((item, idx) => ({
                    PaxType: item.PaxType,
                    ResBookDesigCode: item.ResBookDesigCode
                })),

            };
            console.log('values', values);

            const hasEmptyFields =
                !data.title ||
                !data.firstName ||
                !data.lastName ||
                !data.phoneNumber ||
                !data.countryCode ||
                !data.email ||
                data.passengers.some(
                    (p) =>
                        !p.birthDate ||
                        !p.passengerTypeCode ||
                        !p.givenName ||
                        !p.surname ||
                        !p.nameTitle
                );
            console.log('data', data);
            console.log('hasEmptyFields', hasEmptyFields);

            if (hasEmptyFields) {
                console.warn('Missing required fields. Submission blocked.');
                return;
            }

            dispatch(createListPassengerService(data)).then(action => {

                if (createListPassengerService.fulfilled.match(action)) {
                    dispatch(setSelectedpassengers(data));
                    setActiveStep(2);
                } else if (createListPassengerService.rejected.match(action)) {
                    if (action.payload.status === 400) {
                        const errorMessage = action.payload.title || "An error occurred";
                        setIsAlertOpen(true)
                        setAlertMessage(errorMessage)
                    }
                }
            });

        },

    });




    const steps = [
        {
            label: 'Select flight',
            content: <FlighSelectStep
                handleDetailsClick={handleDetailsClick}
                flights={flights}
                IndirectAirPort={IndirectAirPort}
                isFilterModalOpen={isFilterModalOpen}
                setFilterModalOpen={setFilterModalOpen}
                isShowDetailsModalOpen={isShowDetailsModalOpen}
                setFlightDetailsOpen={setFlightDetailsOpen}
                expandedFlight={expandedFlight}
                handleSelectPlan={handleSelectPlan}
                selectedFlight={selectedFlight}
                setActiveStep={setActiveStep}
                selectedType={selectedType}
                setSelectedFlight={setSelectedFlight}
                handleClickDate={handleClickDate}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
        },
        {
            label: 'Passenger details', content: <PassengerDetails
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                selectedFlight={selectedFlight}
                selectedType={selectedType}
                setIsAlertOpen={setIsAlertOpen}
                setAlertMessage={setAlertMessage}
                formik={formik}
            />

        },
        {
            label: 'Pay & confirm', content: <Payment setActiveStep={setActiveStep}
                activeStep={activeStep}

                selectedFlight={selectedFlight}
                selectedType={selectedType}
                handlePayment={handlePayment}
            />
        },
    ];

    // const loadFlightsWithDelay = (override = {}) => {
    //     setLocalLoading(true);

    //     const updatedDate = override.date || searchParams.date;

    //     const data = {
    //         ...searchParams,
    //         ...override,
    //         date: updatedDate,
    //     };

    //     dispatch(getFlightsService(data));

    //     const timer = setTimeout(() => {
    //         setLocalLoading(false);
    //     }, 3000);

    //     return () => clearTimeout(timer);
    // };

    const handleSelectPos = (id) => {
        const newParams = {
            ...searchParams,
            pos_id: id
        }
        dispatch(getFlightsService(newParams))
        setShowPosModal(false)
    };




    const handleSearchAgain = () => {
        const data = searchParams;

        dispatch(getFlightsService(data)).then((action) => {
            if (getFlightsService.fulfilled.match(action)) {
                setSelectedFlight(null)
                setSessionModalOpen(false);
                restartTimer();
                setActiveStep(0)
            }
        });
    };

    const handleOpenModifySearch = () => {
        setIsModifySearchOpen(true)
    }


    //  Define reusable snippets 

    const progressBarSection = NonEmptySearch && (
        <Section>
            <ProgressBar steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} />
        </Section>
    );

    const routeInfoSection = (
        <Section>
            <RouteInfo activeStep={activeStep} selectedFlight={selectedFlight} />
        </Section>
    );

    const posNoticeSection = showNoice && activeStep === 0 && !selectedFlight && NonEmptySearch && (
        <Section>
            <POSNotice setShowNotice={setShowNotice} setShowPosModal={setShowPosModal} />
        </Section>
    );

    const dateNavigationSection = !selectedFlight && (
        <Section>
            <DateNavigation handleClickDate={handleClickDate} />
        </Section>
    );

    const noResultsSection = (
        <Section>
            {!NonEmptySearch && !isLoadingFlights && <NoResults />}
        </Section>
    );

    const HeaderBarMobile = () => (
        <div className=" px-3 flex items-center justify-between h-16 shadow-md bg-[#F1F1F1]">
            <HeaderMobile handleStepBack={handleStepBack} />
        </div>
    );
    const pageLoding = (isLoadingFlights || localLoading) && isPageLoaded
    return (
        <>

            {pageLoding ? <LottieComponent /> :
                <div ref={scrollRef} className="h-screen overflow-y-auto ">
                    <div className='hidden lg:block'>
                        <Header handleOpenModifySearch={handleOpenModifySearch} />
                        <main className="w-[70%] mx-auto px-2">
                            {progressBarSection}
                            {routeInfoSection}
                            {posNoticeSection}
                            {dateNavigationSection}

                        </main>
                        <Divider />

                    </div>
                    <div className="lg:hidden  w-full ">
                        <HeaderBarMobile />
                        {progressBarSection}
                        {dateNavigationSection}
                        {posNoticeSection}
                    </div>

                    <main className="w-[95%] md:w-[70%] mx-auto px-2">
                        {noResultsSection}
                        {(isLoadingFlights && !isPageLoaded) ? <SkeletonFlightCard /> : steps[activeStep].content}

                    </main>
                    {(activeStep === 1 || activeStep === 2) &&
                        <SummaryMobileBox
                            selectedType={selectedType} selectedFlight={selectedFlight} />
                    }
                </div>
            }
            {/*  Modals */}
            <SessionExpiredModal
                isOpen={isSessionModalOpen}
                onClose={() => setSessionModalOpen(false)}
                handleSearchAgain={handleSearchAgain}
            />
            <AlertModal
                isOpen={isAlertOpen}
                onClose={() => setIsAlertOpen(false)}
                message={alertMessage}

            />
            <ModifySearchModal
                isOpen={isModifySearchOpen}
                onClose={() => setIsModifySearchOpen(false)}
                airPorts={airPorts}
                pos={pos}
                handleResetToFirstStep={handleResetToFirstStep}

            />
            <PosSelectorModal handleSelectPos={handleSelectPos} isOpen={showPosModal} setIsOpen={setShowPosModal} />

        </>

    );
};


export default FlightResultsClient
