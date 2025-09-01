// ContactEditModal.jsx
'use client';
import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ErrorMessage from '../Ui/ErrorMessage';
import CustomDropdown from '../Ui/TitleDropdown';
import Input from '../Ui/Input';
import { X } from '@phosphor-icons/react/dist/ssr';
import countries from '@/util/countries';
import { getIn } from 'formik';
import AddAltNumber from '../FlightResults/PassengerDetails/AddAltNumber';
import { useSelector } from 'react-redux';
export function ContactEditModal({
    isOpen,
    onClose,
    contact,
    errors,
    touched,
    handleSubmit,
    handleChange,
    formikValues,
    setFieldValue,
}) {
    const { isLoadingEditContact } = useSelector((s) => s.manageBook)
    const values = formikValues.contact || {}
    console.log('values', values);
    const v = (path, fallback = '') => getIn(formikValues, path) ?? fallback;
    const [isAlternativeInfo, setIsAlternativeInfo] = useState(false)
    const onClickAlternative = () => {
        setIsAlternativeInfo((prev) => {
            // If toggling off (user hides alt phone field), reset the form values
            if (prev === true) {
                setFieldValue('contact.altPhoneCountryCode', '');
                setFieldValue('contact.altPhone', '');
            }
            if (!prev) {
                setFieldValue('contact.altPhoneCountryCode', values.altPhoneCountryCode);
                setFieldValue('contact.altPhone', values.altPhone);
            }
            return !prev;
        });
    };

    const getErr = (name) => touched && touched[name] && errors && errors[name];
    const Divider = () => <span className="hidden sm:block h-5 w-px bg-[#DADAD7]" />;

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={onClose}>
                <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-150" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black/40" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child as={Fragment} enter="ease-out duration-200" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-150" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-2xl rounded-xl bg-white ring-1 ring-gray-200 shadow-xl">
                                {/* Header */}
                                <div className="relative px-6 pt-5 pb-4 border-b border-gray-200">
                                    <Dialog.Title className="text-[15px] font-medium text-600">Contact details</Dialog.Title>
                                    <button onClick={onClose} aria-label="Close" className="absolute right-5 top-4 text-600 hover:text-700 leading-none">
                                        <X size={18} />
                                    </button>
                                </div>

                                {/* Name */}
                                <div className="px-6 pt-4 text-start text-sm">
                                    <span className="text-primary-1 font-medium  cursor-pointer">{contact?.name || 'Passenger'}</span>
                                    <span className="mx-2  text-500">(Adult)</span>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
                                    {/* Country code + phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <CustomDropdown
                                                type="countries"
                                                selected={v('contact.phoneCountryCode')}
                                                onChange={(val) => setFieldValue('contact.phoneCountryCode', val)}
                                                options={countries}
                                                placeholder="Country code"
                                                error={Boolean(getErr('contact.phoneCountryCode'))}
                                            />
                                            <ErrorMessage error={getErr('contact.phoneCountryCode')} />
                                        </div>

                                        <div>
                                            <Input
                                                id="contact.phone"
                                                name="contact.phone"
                                                type="tel"
                                                label="Phone number"
                                                value={v('contact.phone')}
                                                onChange={handleChange}
                                                error={getErr('contact.phone')}
                                            />
                                            <ErrorMessage error={getErr('contact.phone')} />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Input
                                            id="contact.email"
                                            name="contact.email"
                                            type="email"
                                            label="Email address"
                                            value={v('contact.email')}
                                            onChange={handleChange}
                                            error={getErr('contact.email')}
                                        />
                                        <ErrorMessage error={getErr('contact.email')} />
                                    </div>
                                    <AddAltNumber onClickAlternative={onClickAlternative} isAlternativeInfo={isAlternativeInfo} />
                                    {/* <div className="flex gap-2 text-start text-sm">
                                        <span className="text-primary-1 font-medium  cursor-pointer"> Alternative Mobile Number </span>
                                        <Divider />
                                        <span className="text-alert font-medium  underline cursor-pointer"> Delete </span>

                                    </div> */}
                                    {/* Alt phone */}
                                    {isAlternativeInfo &&

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <CustomDropdown
                                                    type="countries"
                                                    selected={v('contact.altPhoneCountryCode')}
                                                    onChange={(val) => setFieldValue('contact.altPhoneCountryCode', val)}
                                                    options={countries}
                                                    placeholder="Country code"
                                                    error={Boolean(getErr('contact.altPhoneCountryCode'))}
                                                />
                                                <ErrorMessage error={getErr('contact.altPhoneCountryCode')} />
                                            </div>

                                            <div>
                                                <Input
                                                    id="contact.altPhone"
                                                    name="contact.altPhone"
                                                    type="tel"
                                                    label="Mobile number"
                                                    value={v('contact.altPhone')}
                                                    onChange={handleChange}
                                                    error={getErr('contact.altPhone')}
                                                />
                                                <ErrorMessage error={getErr('contact.altPhone')} />
                                            </div>
                                        </div>
                                    }
                                    <div className="pt-2 flex justify-center">
                                        <button
                                            disabled={isLoadingEditContact}
                                            // onClick={handleSubmit}
                                            type='submit'
                                            className={`min-w-[160px] rounded-lg
                                                 bg-secondary-1 
                                                  text-white text-sm md:text-[16px] font-semibold px-6 py-2.5`}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
