"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ticket, User, Info } from "@phosphor-icons/react";
import BookingNotFoundModal from "./BookingNotFoundModal";
import FloatingInput from "./FloatingInput";
import ManageFooter from "./ManageFooter";
import ModalDescription from "./ModalDescription";
import { useDispatch, useSelector } from "react-redux";
import { searchBookService } from "@/store/Services/manageBookingServices";
import { useRouter } from "next/navigation";
import { setPnrParams } from "@/store/manageSlice";

const ManageTap = () => {
    const { isLoading, pnrParams } = useSelector((s) => s.manageBook)
    const { pnr, lastName } = pnrParams
    const [modalOpen, setModalOpen] = useState(false);
    const [alert, setAlert] = useState({
        title: '',
        description: ''
    });
    const dispatch = useDispatch()
    const router = useRouter()
    const formik = useFormik({
        initialValues: { pnr, lastName },
        validationSchema: Yup.object({
            pnr: Yup.string()
                .trim()
                .min(6, "*PNR must be 6 characters")
                .required("*please enter your Reservation number"),
            lastName: Yup.string()
                .matches(/^[A-Za-z]+(?: [A-Za-z]+)*$/, 'Last name must contain only English letters')
                .required('Last name is required'),

        }),
        onSubmit: ({ pnr, lastName }) => {
            const data = { lastName, PNR: pnr };
            dispatch(setPnrParams({ pnr, lastName }))
            dispatch(searchBookService(data))
                .then(({ payload }) => {
                    const { result, statusCode } = payload || {};

                    if (statusCode === 200 && Object.keys(result.data).length > 0) {
                        router.push("/manage-booking");

                    } else {
                        const { title, description } = result.alert || {};
                        setAlert({ title: title || "Server Error", description: description || "Something went wrong on our side. Please try again later." })
                        setModalOpen(true);
                    }
                });
        },

    });

    // Limit PNR to 6 chars and force uppercase
    const handlePNRChange = (e) => {
        const value = e.target.value.toUpperCase().slice(0, 6);
        formik.setFieldValue("pnr", value);
        dispatch(setPnrParams({ pnr: value, lastName }))
    };

    // Force uppercase for last name
    const handleLastNameChange = (e) => {
        const englishOnly = e.target.value
            .replace(/[^A-Za-z\s]/g, '')
            .replace(/\s+/g, ' ')
            .trimStart()
            .toUpperCase();
        formik.setFieldValue('lastName', englishOnly);
        dispatch(setPnrParams({ pnr, lastName: englishOnly }))

    };

    useEffect(() => {
        if (pnr && lastName) {
            const timer = setTimeout(() => {
                dispatch(setPnrParams({ pnr: "", lastName: "" }));
            }, 24 * 60 * 60 * 1000); // 24 hours

            return () => clearTimeout(timer);
        }
    }, [pnr, lastName, dispatch]);

    const canSearch = (!!formik.values.pnr && !!formik.values.lastName)

    return (
        <div className="h-auto  md:h-[180px]">
            {/* <div className="h-[30px]"></div> */}
            <form onSubmit={formik.handleSubmit} className="w-full max-w-7xl mx-auto">
                {/* inputs row */}
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
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
                title={alert?.title}
                description={alert?.description}
                isBtn
            />
        </div>
    );
};

export default ManageTap;


