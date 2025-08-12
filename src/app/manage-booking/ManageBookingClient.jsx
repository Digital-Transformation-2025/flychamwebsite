'use client'
import ContactDetails from '@/components/Manage-booking/ContactDetails';
import { ContactEditModal } from '@/components/Manage-booking/ContactEditModal';
import FlightDetailsHeader from '@/components/Manage-booking/FlightDetailsHeader';
import FlightItineraryList from '@/components/Manage-booking/FlightItineraryList';
import Header from '@/components/Manage-booking/Header'
import Panner from '@/components/Manage-booking/Panner'
import PassengersInformation from '@/components/Manage-booking/PassengersInformation';
import Tabs from '@/components/Manage-booking/Tabs'
import TravelAgencyAlert from '@/components/Manage-booking/TravelAgencyAlert';
import { contactSchemaInManage } from '@/util/validatonSchemas';
import { useFormik } from 'formik';
import React, { useState } from 'react'
const tabs = [
    'Flight details',
    'Passengers information',
    'Contact details',
    'Additional services',
];
const contact = {
    name: 'MR.Mouayad Hawari',
    type: 'Primary',
    email: 'moaidhawari@gmail.com',
    mobile: '+963 935679806',
    altMobile: '+963 935679806',
};
const ManageBookingClient = () => {
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
            console.log('✅ Saved', values);
        },
    });

    return (
        <div className='h-[400vh]'>
            <Header />
            <Panner />
            <Tabs tabs={tabs} />
            <div className="max-w-[90%] md:max-w-[70%] mx-auto">
                <TravelAgencyAlert />
                <FlightDetailsHeader />
                <FlightItineraryList />
                <PassengersInformation />
                <ContactDetails onEdit={onEdit} />
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
        </div>
    )
}

export default ManageBookingClient