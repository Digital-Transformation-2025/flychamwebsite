'use client'
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
import { contactSchemaInManage } from '@/util/validatonSchemas';
import { useFormik } from 'formik';
import React, { useState } from 'react'
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
    {
        id: 3,
        label: 'Additional services'
    },
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
    const [active, setActive] = useState(0);
    const [openExtra, setOpenExtra] = useState(false)

    const handleClickBtn = (btn) => {
        if (btn === "Add extra") {
            setOpenExtra(true)
        }
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
    const onChangeTab = (tab, index, containerRef, itemRefs) => {
        setActive(tab.id);

        // scroll to section vertically
        const el =
            document.getElementById(`section-${tab.id}`) ||
            document.getElementById(String(tab.id));
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        // scroll tab horizontally if clipped
        const container = containerRef.current;
        const elTab = itemRefs.current[index];
        if (container && elTab) {
            const containerRect = container.getBoundingClientRect();
            const elRect = elTab.getBoundingClientRect();

            if (elRect.left < containerRect.left) {
                // scroll left
                container.scrollTo({
                    left: container.scrollLeft - (containerRect.left - elRect.left) - 20,
                    behavior: 'smooth',
                });
            } else if (elRect.right > containerRect.right) {
                // scroll right
                container.scrollTo({
                    left: container.scrollLeft + (elRect.right - containerRect.right) + 20,
                    behavior: 'smooth',
                });
            }
        }
    };


    React.useEffect(() => {
        const handleScroll = () => {
            let current = tabs[0].id;
            const probeY = 10; // line just under the sticky header thanks to scroll-mt

            for (const t of tabs) {
                const el =
                    document.getElementById(`section-${t.id}`) ||
                    document.getElementById(String(t.id));
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                if (rect.top <= probeY && rect.bottom > probeY) {
                    current = t.id;
                    break;
                }
            }
            console.log('current', current);

            setActive(current);
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, [tabs]);




    const Loading = <LottieComponent />
    const contet = <div className='h-[400vh]'>
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
            <Tabs tabs={tabs} active={active} onChange={onChangeTab} />
        </div>

        <div className="max-w-[90%] md:max-w-[70%] mx-auto space-y-8 pt-[220px] md:pt-0">
            {isTraveleAgent &&
                <TravelAgencyAlert />
            }
            <div
                id="section-0"
                className="scroll-mt-[360px]  md:scroll-mt-0"
            >
                <FlightDetailsHeader isTraveleAgent={isTraveleAgent} />
                <FlightItineraryList firstSegment={firstSegment} secoundSegment={secoundSegment} />
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
            <div id="section-2" className="scroll-mt-[360px] md:scroll-mt-0">
                <ContactDetails onEdit={onEdit} contactInfo={contactInfo} />
            </div>
            <div id="section-3" className="scroll-mt-[360px] md:scroll-mt-0">
                <div className="py-20 text-center text-gray-500">Additional services</div>
            </div>
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

    </div>
    return (
        isLoading ? Loading : contet
    )
}

export default ManageBookingClient