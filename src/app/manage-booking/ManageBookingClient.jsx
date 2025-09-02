'use client'
import FlightDetailsModal from '@/components/FlightResults/FlighSelectStep/FlightDetailsModal';
import CancelBookingModal from '@/components/Manage-booking/CancelBooking/CancelBookingModal';
import ContactDetailsCardSkeleton from '@/components/Manage-booking/Contact/ContactDetailsCardSkeleton';
import ContactDetails from '@/components/Manage-booking/ContactDetails';
import { ContactEditModal } from '@/components/Manage-booking/ContactEditModal';
import ExtraBaggageModal from '@/components/Manage-booking/ExtraBaggage/ExtraBaggageModal';
import FlightDetailsHeader from '@/components/Manage-booking/FlightDetailsHeader';
import FlightItineraryList from '@/components/Manage-booking/FlightItineraryList';
import Header from '@/components/Manage-booking/Header'
import Panner from '@/components/Manage-booking/Panner'
import PassengersInformation from '@/components/Manage-booking/PassengersInformation';
import Tabs from '@/components/Manage-booking/Tabs'
import TravelAgencyAlert from '@/components/Manage-booking/TravelAgencyAlert';
import LottieComponent from '@/components/Ui/LottieComponent';
import { useStickyHeaderHeight } from '@/hooks/useStickyHeaderHeight';
import { useTabsScrollSpy } from '@/hooks/useTabsScrollSpy';
import { setReasons, setRules } from '@/store/manageSlice';
import { editContactService, searchBookService } from '@/store/Services/manageBookingServices';
// import { useScrollSpy } from '@/hooks/useScrollSpyTabs';
import { contactSchemaInManage } from '@/util/validatonSchemas';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
const tabs = [
    {
        id: 0,
        label: 'Flight details'
    },
    {
        id: 1,
        label: 'Passengers information'
    },
    {
        id: 2,
        label: 'Contact details'
    },
    // {
    //     id: 3,
    //     label: 'Additional services'
    // },
];

const ManageBookingClient = ({ rules, reasons }) => {
    const containerRef = useRef(null);
    const router = useRouter()
    const dispatch = useDispatch()
    const [isAlternativeInfo, setIsAlternativeInfo] = useState(false)

    const { isLoading, bookInfo, pnrParams } = useSelector((s) => s.manageBook)
    const { isTraveleAgent, mainImage, segments, bookingReference: pnr, contactInfo, passengers, sessionId, isAlternativePhone } = bookInfo || {}
    const { title, firstName, lastName, email, countryCodeMobile, countryCodeTele, mobile, telephone } = contactInfo || {}
    const [isFirstRender, setIsFirstRender] = useState(true)
    useEffect(() => {
        setIsFirstRender(false)
    }, [])
    const filteredTabs = isTraveleAgent

        ? tabs.filter((t) => t.id !== 2)
        : tabs;
    const contact = useMemo(() => ({
        name: `${title}. ${firstName}${lastName}`,
        type: 'Primary',
        email,
        phone: telephone || '',
        altPhone: mobile,
        phoneCountryCode: countryCodeTele,
        altPhoneCountryCode: countryCodeMobile,
    }), [title, firstName, lastName, email, telephone, mobile, countryCodeTele, countryCodeMobile]);
    // then initialValues: { contact: memoContact }

    // Measure the sticky wrapper (Header+Panner+Tabs) height when fixed
    const stickyH = useStickyHeaderHeight("#sticky-head");

    const getSectionId = useCallback((t) => `section-${t.id}`, []);

    // Tell the spy to use the same offset so manual scroll highlights correctly
    const { active, onChangeTab } = useTabsScrollSpy(filteredTabs, {
        headerSelector: "#sticky-head",
        getSectionId,
        offset: stickyH,
    });


    const [openExtra, setOpenExtra] = useState(false)
    const [openCancelBook, setOpenCancelBook] = useState(false)
    const [isShowDetailsModalOpen, setFlightDetailsOpen] = useState(false)
    const [clickedFlight, setClickedFlight] = useState({})

    const handleClickBtn = (btn) => {
        if (btn === "Add extra") {
            setOpenExtra(true)
        }
    }
    const handleClickCancel = (btn) => {
        setOpenCancelBook(true)
    }
    const handleClickDetails = (leg) => {
        setFlightDetailsOpen(true)
        setClickedFlight(leg)
    }




    const firstSegment = segments?.length > 0 && segments[0]
    const secoundSegment = segments?.length > 0 && segments[1]
    const { flightNumber, departureCity: origin, arrivalCity: destination, departureDate: dateLabel } = firstSegment || {}

    const [showContactModal, setShowContactModal] = useState(false)
    const onEdit = () => {
        setShowContactModal(true)
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: `${title}. ${firstName}${lastName}` || '',
            phoneCountryCode: countryCodeTele || '',
            phone: telephone || '',
            email: email || '',
            altPhoneCountryCode: isAlternativePhone ? countryCodeMobile : '',
            altPhone: isAlternativePhone ? mobile : '',
            type: 'Primary',
            IsDelete: false
        },

        validationSchema: contactSchemaInManage,
        onSubmit: async (values) => {
            const { email, phone, altPhone, phoneCountryCode, altPhoneCountryCode, IsDelete } = values || {}
            const data = {
                SessionId: sessionId,
                IsDelete,
                contact: {
                    Email: email,
                    Mobile: {
                        Country: altPhoneCountryCode,
                        Number: altPhone
                    },
                    Phone: {
                        Country: phoneCountryCode,
                        Number: phone
                    }
                }
            }
            dispatch(editContactService(data)).then((action) => {
                if (editContactService.fulfilled.match(action)) {
                    getPnrData()
                    setShowContactModal(false);
                }
            });

        },
    });



    const flight = {
        common_info: {
            segments: [
                {
                    origin_city: clickedFlight?.banner?.fromCity,
                    destination_city: clickedFlight?.banner?.toCity,
                    departureDate: clickedFlight?.banner?.dateText,
                    Duration: clickedFlight?.mid?.durationText?.split(',')[1],
                    stops: clickedFlight?.mid?.durationText?.split(',')[0],
                    departure_time: clickedFlight?.left?.time,
                    arrival_time: clickedFlight?.right?.time,
                    origin_name: clickedFlight?.left?.airport,
                    destination_name: clickedFlight?.right?.airport,
                    FlightNumber: clickedFlight?.flightNumber,
                },
            ],
        },
    };

    const getPnrData = () => {
        const data = { lastName: pnrParams.lastName, PNR: pnrParams.pnr };
        dispatch(searchBookService(data)).then((action) => {
            if (searchBookService.fulfilled.match(action)) {
                console.log('action', action.payload);

            }
            if (searchBookService.rejected.match(action)) {
                router.push("/")
            }
        })
    }

    useEffect(() => {
        if (!Boolean(bookInfo)) {
            getPnrData()
        }
    }, [])

    useEffect(() => {
        dispatch(setRules(rules))
        dispatch(setReasons(reasons))
    }, [rules, reasons])

    useEffect(() => {
        setIsAlternativeInfo(isAlternativePhone)
    }, [isAlternativePhone])




    const Loading = <LottieComponent />
    const contet =
        bookInfo && (
            <div className='pb-20 '>
                <div
                    id="sticky-head"

                    className="fixed top-0 left-0 right-0 z-50 bg-white md:static md:z-auto"
                >
                    <Header />
                    <Panner
                        mainImage={mainImage}
                        origin={origin}
                        destination={destination}
                        pnr={pnr}
                        dateLabel={dateLabel}
                    />
                    <Tabs tabs={filteredTabs} active={active} onChange={onChangeTab} />
                </div>

                <div
                    ref={containerRef}
                    className="max-w-[90%] md:max-w-[70%] mx-auto space-y-8 "

                    style={{ paddingTop: stickyH }}
                >
                    {isTraveleAgent &&
                        <TravelAgencyAlert />
                    }
                    <div id="section-0" style={{ scrollMarginTop: stickyH }}>

                        <FlightDetailsHeader isTraveleAgent={isTraveleAgent}
                            contactEmail={contact?.email}
                            handleClickCancel={handleClickCancel}
                        />
                        <FlightItineraryList
                            firstSegment={firstSegment} secoundSegment={secoundSegment}
                            handleClickDetails={handleClickDetails}

                        />
                    </div>

                    <div id="section-1" style={{ scrollMarginTop: stickyH }}>
                        <PassengersInformation
                            passengers={passengers}
                            isTraveleAgent={isTraveleAgent}
                            firstSegment={firstSegment}
                            secoundSegment={secoundSegment}
                            handleClickBtn={handleClickBtn}
                        />
                    </div>
                    {!isTraveleAgent &&
                        <div id="section-2" style={{ scrollMarginTop: stickyH }} className='mb-50'>
                            {!isLoading ? <ContactDetails onEdit={onEdit} contactInfo={contactInfo} /> : <ContactDetailsCardSkeleton />}
                        </div>
                    }
                    {/* <div id="section-3" className="scroll-mt-[360px] md:scroll-mt-0">
                <div className="py-20 text-center text-gray-500">Additional services</div>
            </div> */}
                </div>
                {!isTraveleAgent && contact &&

                    <ContactEditModal
                        isOpen={showContactModal}
                        onClose={() => setShowContactModal(false)}
                        contact={contact}
                        errors={formik.errors}
                        touched={formik.touched}
                        handleSubmit={formik.handleSubmit}
                        values={formik.values}
                        handleChange={formik.handleChange}
                        setFieldValue={formik.setFieldValue}
                        isAlternativePhone={isAlternativePhone}
                        isAlternativeInfo={isAlternativeInfo}
                        setIsAlternativeInfo={setIsAlternativeInfo}
                    />
                }
                <ExtraBaggageModal open={openExtra} onClose={() => setOpenExtra(false)} />
                <CancelBookingModal
                    open={openCancelBook}
                    onClose={() => setOpenCancelBook(false)}
                    email={contactInfo?.email}
                    sessionId={sessionId}
                />
                <FlightDetailsModal
                    isOpen={isShowDetailsModalOpen}
                    onClose={() => setFlightDetailsOpen(false)}
                    flight={flight}
                />

            </div>)

    return (
        (isLoading && isFirstRender) ? Loading : contet
    )
}

export default ManageBookingClient