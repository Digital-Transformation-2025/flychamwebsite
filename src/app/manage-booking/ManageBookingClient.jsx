'use client'
import FlightDetailsModal from '@/components/FlightResults/FlighSelectStep/FlightDetailsModal';
import CancelBookingModal from '@/components/Manage-booking/CancelBooking/CancelBookingModal';
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
import { useTabsScrollSpy } from '@/hooks/useTabsScrollSpy';
// import { useScrollSpy } from '@/hooks/useScrollSpyTabs';
import { contactSchemaInManage } from '@/util/validatonSchemas';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
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
const contact = {
    name: 'MR.Mouayad Hawari',
    type: 'Primary',
    email: 'moaidhawari@gmail.com',
    mobile: '+963 935679806',
    altMobile: '+963 935679806',
};
const ManageBookingClient = () => {
    const { isLoading, bookInfo } = useSelector((s) => s.manageBook)
    const { isTraveleAgent, mainImage, segments, bookingReference: pnr, contactInfo, passengers } = bookInfo || {}
    const filteredTabs = isTraveleAgent
        ? tabs.filter((t) => t.id !== 2)
        : tabs;


    const { active, onChangeTab } = useTabsScrollSpy(filteredTabs, {
        headerSelector: "#sticky-head",
        getSectionId: (t) => `section-${t.id}`,
    });

    console.log('active', active);

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
            countryCode: contact.countryCode,
            mobile: contact.mobile,
            altCounryCode: contact.altCounryCode,
            altMobile: contact.altMobile,
            email: contact.email,
        },
        validationSchema: contactSchemaInManage,
        onSubmit: async (values) => {
            // call your API here if needed
            // await api.updateContact(values)
            setShowContactModal(false);
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





    const Loading = <LottieComponent />
    const contet = <div className=''>
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

        <div className="max-w-[90%] md:max-w-[70%] mx-auto space-y-8 pt-[220px] md:pt-0">
            {isTraveleAgent &&
                <TravelAgencyAlert />
            }
            <div
                id="section-0"
                className="scroll-mt-[360px]  md:scroll-mt-0"
            >
                <FlightDetailsHeader isTraveleAgent={isTraveleAgent}

                />
                <FlightItineraryList
                    firstSegment={firstSegment} secoundSegment={secoundSegment}
                    handleClickCancel={handleClickCancel}
                    handleClickDetails={handleClickDetails}

                />
            </div>

            <div id="section-1" className="scroll-mt-[360px] md:scroll-mt-0">
                <PassengersInformation
                    passengers={passengers}
                    isTraveleAgent={isTraveleAgent}
                    firstSegment={firstSegment}
                    secoundSegment={secoundSegment}
                    handleClickBtn={handleClickBtn}
                />
            </div>
            {!isTraveleAgent &&
                <div id="section-2" className="scroll-mt-[360px] md:scroll-mt-0">
                    <ContactDetails onEdit={onEdit} contactInfo={contactInfo} />
                </div>
            }
            {/* <div id="section-3" className="scroll-mt-[360px] md:scroll-mt-0">
                <div className="py-20 text-center text-gray-500">Additional services</div>
            </div> */}
        </div>
        <ContactEditModal
            isOpen={showContactModal}
            onClose={() => setShowContactModal(false)}
            contact={contact}
            onSave={(payload) => console.log('✅ Save payload:', payload)}
            errors={formik.errors}
            touched={formik.touched}
            handleSubmit={formik.handleSubmit}
            values={formik.values}
            handleChange={formik.handleChange}
            setFieldValue={formik.setFieldValue}
        />
        <ExtraBaggageModal open={openExtra} onClose={() => setOpenExtra(false)} />
        <CancelBookingModal
            open={openCancelBook}
            onClose={() => setOpenCancelBook(false)}
            bookingRef="NHG7Y0"
            maskedPhone="*8066"
        />
        <FlightDetailsModal
            isOpen={isShowDetailsModalOpen}
            onClose={() => setFlightDetailsOpen(false)}
            flight={flight}
        />

    </div>
    return (
        isLoading ? Loading : contet
    )
}

export default ManageBookingClient