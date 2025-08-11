"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Ticket, User, Info } from "@phosphor-icons/react";
import BookingNotFoundModal from "./BookingNotFoundModal";

const ManageTap = () => {
    const [modalOpen, setModalOpen] = useState(false);

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
            console.log("Search:", values);
            // Simulate "not found"
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
        const value = e.target.value.toUpperCase();
        formik.setFieldValue("lastName", value);
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
                        onChange={(e) => {
                            // Remove anything that's not A–Z or a–z
                            const englishOnly = e.target.value.replace(/[^A-Za-z]/g, '').toUpperCase();
                            formik.setFieldValue('lastName', englishOnly);
                        }} onBlur={formik.handleBlur}
                        touched={formik.touched.lastName}
                        error={formik.errors.lastName}
                    />
                </div>

                {/* help + button row */}
                <div className="mt-4 flex items-center justify-between">
                    <button
                        type="button"
                        className="flex items-center gap-2 text-[13px] text-primary-1"
                        onClick={() =>
                            alert("Show 'can't find my Reservation number' help")
                        }
                    >
                        <Info size={16} />
                        I can’t find my Reservation number
                    </button>

                    <button
                        type="submit"
                        disabled={!canSearch}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition ${canSearch
                            ? "bg-secondary-1 text-white hover:opacity-90"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        Search
                    </button>
                </div>
            </form>

            {/* Modal */}
            <BookingNotFoundModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                title="Booking not found"
                description={
                    <>
                        Please check your{" "}
                        <span className="font-medium text-600">Reservation number</span> or{" "}
                        <span className="font-medium text-600">Last Name</span>, and try
                        again, or{" "}
                        <a href="#" className="underline text-primary-1">
                            contact
                        </a>{" "}
                        our support team for help.
                    </>
                }
                isBtn
            />
        </>
    );
};

export default ManageTap;

/* ------------------------- Floating Input ------------------------- */
const FloatingInput = ({
    name,
    label,
    hint,
    icon,
    value,
    onChange,
    onBlur,
    touched,
    error,
}) => {
    const [focused, setFocused] = useState(false);
    const float = focused || String(value || "").length > 0;
    const hasError = !!(touched && error);

    return (
        <div className="relative flex-1 min-w-[260px]">
            <div
                className={`relative rounded-xl px-4 py-6 h-[104px] flex items-center bg-100 ${hasError ? "border-2 border-alert" : "border border-transparent"
                    }`}
            >
                {/* icon */}
                <div
                    className={`absolute left-4 top-1/2 -translate-y-1/2 ${hasError ? "text-alert" : "text-400"
                        }`}
                >
                    {icon}
                </div>

                {/* floating label */}
                <label
                    htmlFor={name}
                    className={`absolute left-10 transition-all duration-200 select-none ${float ? "top-5 text-[14px]" : "top-1/2 -translate-y-1/2 text-[16px]"
                        } ${hasError ? "text-alert" : "text-600"}`}
                >
                    {label}
                </label>

                {/* input */}
                <input
                    id={name}
                    name={name}
                    value={value}
                    onChange={onChange}
                    onBlur={(e) => {
                        setFocused(false);
                        onBlur?.(e);
                    }}
                    onFocus={() => setFocused(true)}
                    aria-invalid={hasError}
                    className="w-full bg-transparent outline-none pl-10 pt-4 text-[14px] text-black"
                    autoComplete="off"
                />

                {/* inline hint when empty */}
                {!float && hint ? (
                    <span className="absolute left-10 bottom-2 text-[12px] text-400">
                        {hint}
                    </span>
                ) : null}
            </div>

            {/* error text */}
            {hasError ? (
                <div className="mt-2 text-[12px] text-alert">{error}</div>
            ) : null}
        </div>
    );
};
