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
import { setPnr, setSearchParams, setSelectedF, setSelectedPlan } from '@/store/flightSlice'
import { createPaymentService, getFlightsService } from '@/store/Services/flightServices'
import NoResults from '@/components/FlightResults/NoResults'
import Screen from '@/components/Ui/Screen'
import SessionExpiredModal from '@/components/FlightResults/SessionExpiredModal'
import { useRouter } from 'next/navigation'
import POSNotice from '@/components/FlightResults/POSNotice'
import PosSelectorModal from '@/components/FlightResults/FlighSelectStep/PosSelectorModal'
import useSessionTimer from '@/hooks/useSessionTimer'
import AlertModal from '@/components/FlightResults/AlertModal'
import LottieComponent from '@/components/Ui/LottieComponent'

const FlightResultsClient = () => {

    const scrollRef = useRef(null)  // ✅ Create scrollable div ref

    const dispatch = useDispatch()
    const { flights, selectedPassengers, searchParams, isLoadingFlights, selectedPlan, IndirectAirPort } = useSelector((state) => state.flights);
    const { adults, children, infants } = searchParams;
    const passengerNumber = adults + children + infants

    const router = useRouter()
    const [showNoice, setShowNotice] = useState(true);
    const [showPosModal, setShowPosModal] = useState(false);
    const [localLoading, setLocalLoading] = useState(true);
    const [isSessionModalOpen, setSessionModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [alertMessage, setAlertMessage] = useState(false);

    const [isFilterModalOpen, setFilterModalOpen] = useState(false);
    const [isShowDetailsModalOpen, setFlightDetailsOpen] = useState(false);
    const [expandedFlight, setExpandedFlight] = useState(null);
    const [selectedFlight, setSelectedFlight] = useState(null);
    const [selectedType, setSelectedType] = useState(null);
    const [activeStep, setActiveStep] = useState(0);

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


    const HeaderBarMobile = () => (
        <div className=" px-3 flex items-center justify-between h-16 shadow-md bg-[#F1F1F1]">
            <HeaderMobile handleStepBack={handleStepBack} />
        </div>
    );

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
                checkoutUrl ? window.open(checkoutUrl, '_self') : console.error("Checkout URL not found");
            } else if (createPaymentService.rejected.match(action)) {
                const status = action.payload?.status || action.error?.status;
                alert(status === 400 ? "There was a problem with your request. Please try again." : "Something went wrong. Please try again later.");
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
        loadFlightsWithDelay({ date: formattedFullDate });
    };




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

    const loadFlightsWithDelay = (override = {}) => {
        setLocalLoading(true);

        const updatedDate = override.date || searchParams.date;

        const data = {
            ...searchParams,
            ...override,
            date: updatedDate,
        };

        dispatch(getFlightsService(data));

        const timer = setTimeout(() => {
            setLocalLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    };


    useEffect(() => {
        const data = searchParams;
        const { origin_id, destination_id, date } = searchParams;

        if (!origin_id || !destination_id || !date) {
            router.push("/");
        } else {
            dispatch(getFlightsService(data)).then((action) => {
                if (getFlightsService.rejected.match(action)) {
                    router.push("/");
                }
            });


            const timer = setTimeout(() => {
                setLocalLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, []);


    const handleSelectPos = (id) => {
        const newParams = {
            ...searchParams,
            pos_id: id
        }
        dispatch(getFlightsService(newParams))
        setShowPosModal(false)
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);

        return () => clearTimeout(timer);
    }, [activeStep, selectedFlight]);



    const handleSearchAgain = () => {
        const data = searchParams;

        dispatch(getFlightsService(data)).then((action) => {
            if (getFlightsService.fulfilled.match(action)) {
                setSessionModalOpen(false);
                restartTimer();
            }
        });
    };


    return (
        <>

            {/* {(isLoadingFlights || localLoading) ? <Screen /> : */}
            {(isLoadingFlights || localLoading) ? <LottieComponent /> :


                <div ref={scrollRef} className="h-screen overflow-y-auto">
                    <div className='hidden lg:block'>
                        <Header />
                        <main className="w-[70%] mx-auto px-2">
                            {(flights?.length > 0 || IndirectAirPort.length > 0) &&

                                <Section><ProgressBar steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} /></Section>
                            }
                            <Section><RouteInfo activeStep={activeStep} selectedFlight={selectedFlight} /></Section>
                            {showNoice && (activeStep === 0) && !selectedFlight && (flights?.length > 0 || IndirectAirPort.length > 0) &&
                                <Section>

                                    <POSNotice setShowNotice={setShowNotice} setShowPosModal={setShowPosModal} />
                                </Section>
                            }
                            {!selectedFlight &&
                                <Section ><DateNavigation handleClickDate={handleClickDate} /></Section>

                            }
                        </main>
                        <Divider />
                    </div>
                    <div className="lg:hidden  w-full">
                        <HeaderBarMobile />
                        {(flights?.length > 0 || IndirectAirPort.length > 0) &&
                            <Section><ProgressBar steps={steps} activeStep={activeStep} setActiveStep={setActiveStep} /></Section>
                        }
                        {!selectedFlight &&
                            <Section ><DateNavigation handleClickDate={handleClickDate} /></Section>

                        }
                        {showNoice && (activeStep === 0) && !selectedFlight && (flights?.length > 0 || IndirectAirPort.length > 0) &&
                            <POSNotice setShowNotice={setShowNotice} setShowPosModal={setShowPosModal} />
                        }
                    </div>

                    <main className="w-[95%] md:w-[70%] mx-auto px-2">
                        {steps[activeStep].content}
                        <Section>
                            {/* {flights?.length === 0 && IndirectAirPort.length === 0 && <NoResults />} */}
                            {flights?.length === 0 || IndirectAirPort.length === 0 && <NoResults />}
                        </Section>
                    </main>

                </div>}

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
            <PosSelectorModal handleSelectPos={handleSelectPos} isOpen={showPosModal} setIsOpen={setShowPosModal} />

        </>

    );
};


export default FlightResultsClient
