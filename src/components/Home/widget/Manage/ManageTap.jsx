"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ticket, User, Info } from "@phosphor-icons/react";
import BookingNotFoundModal from "./BookingNotFoundModal";
import FloatingInput from "./FloatingInput";
import ManageFooter from "./ManageFooter";
import ModalDescription from "./ModalDescription";
import { useDispatch } from "react-redux";
import { searchBookService } from "@/store/Services/manageBookingServices";
import { useRouter } from "next/navigation";

const ManageTap = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const dispatch = useDispatch()
    const router = useRouter()
    const formik = useFormik({
        initialValues: { pnr: "", lastName: "" },
        validationSchema: Yup.object({
            pnr: Yup.string()
                .trim()
                .max(6, "*PNR must be 6 characters or less")
                .required("*please enter your Reservation number"),
            lastName: Yup.string()
                .matches(/^[A-Za-z]+$/, 'Last name must contain only English letters (A–Z)')
                .required('Last name is required'),
        }),
        onSubmit: (values) => {
            const { pnr, lastName } = values;
            const data = {
                lastName, PNR: pnr
            }
            dispatch(searchBookService(data)).then((action) => {
                if (searchBookService.fulfilled.match(action)) {
                    router.push("/manage-booking")
                }
            })
            console.log('values', values);

            setModalOpen(true);
        },
    });

    // Limit PNR to 6 chars and force uppercase
    const handlePNRChange = (e) => {
        const value = e.target.value.toUpperCase().slice(0, 6);
        formik.setFieldValue("pnr", value);
    };

    // Force uppercase for last name
    const handleLastNameChange = (e) => {
        const englishOnly = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
        formik.setFieldValue('lastName', englishOnly);
    };

    const canSearch = !!formik.values.pnr && !!formik.values.lastName;

    return (
        <>
            <div className="h-[8px]"></div>
            <form onSubmit={formik.handleSubmit} className="w-full max-w-5xl mx-auto">
                {/* inputs row */}
                <div className="flex flex-col lg:flex-row gap-6 items-stretch">
                    <FloatingInput
                        name="pnr"
                        label="Reservation number (PNR)"
                        hint="ex.4XKCT2"
                        icon={<Ticket size={18} weight="fill" />}
                        value={formik.values.pnr}
                        onChange={handlePNRChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.pnr}
                        error={formik.errors.pnr}
                    />
                    <FloatingInput
                        name="lastName"
                        label="Last name"
                        icon={<User size={18} weight="fill" />}
                        value={formik.values.lastName}
                        onChange={handleLastNameChange}
                        onBlur={formik.handleBlur}
                        touched={formik.touched.lastName}
                        error={formik.errors.lastName}
                    />
                </div>
                {/* help + button row */}
                <ManageFooter canSearch={canSearch} />
            </form>
            {/* Modal */}
            <BookingNotFoundModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Booking not found"
                description={<ModalDescription />}
                isBtn
            />
        </>
    );
};

export default ManageTap;


