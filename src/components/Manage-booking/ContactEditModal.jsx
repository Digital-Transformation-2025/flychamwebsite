// ContactEditModal.jsx
'use client';
import React, { Fragment, useEffect, useState } from 'react';
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
    values,
    setFieldValue,
    isAlternativePhone,
    isAlternativeInfo,setIsAlternativeInfo
}) {
    
    const { isLoadingEditContact } = useSelector((s) => s.manageBook)


    const v = (path, fallback = '') => getIn(values, path) ?? fallback;


    const getErr = (name) => touched && touched[name] && errors && errors[name];
    const Divider = () => <span className="hidden sm:block h-5 w-px bg-[#DADAD7]" />;

    const hanldeDelete = () => {
        setIsAlternativeInfo((prev) => {
            // If toggling off (user hides alt phone field), reset the form values
            if (prev === true) {
                setFieldValue('altPhoneCountryCode', '');
                setFieldValue('altPhone', '');
                setFieldValue('IsDelete', true);
            }
            if (!prev) {
                setFieldValue('altPhoneCountryCode', values.altPhoneCountryCode);
                setFieldValue('altPhone', values.altPhone);
                setFieldValue('IsDelete', false);

            }
            return !prev;
        });
    }

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
                                    <span className="text-800 font-semibold  cursor-pointer">{contact?.name || 'Passenger'}</span>
                                    <span className="mx-2  text-500">(Adult)</span>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="px-6 pb-6 pt-4 space-y-4">
                                    {/* Country code + phone */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <CustomDropdown
                                                type="countries"
                                                selected={v('phoneCountryCode')}
                                                onChange={(val) => setFieldValue('phoneCountryCode', val)}
                                                options={countries}
                                                placeholder="Country code"
                                                error={Boolean(getErr('phoneCountryCode'))}
                                            />
                                            <ErrorMessage error={getErr('phoneCountryCode')} />
                                        </div>

                                        <div>
                                            <Input
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                label="Phone number"
                                                value={v('phone')}
                                                onChange={handleChange}
                                                error={getErr('phone')}
                                            />
                                            <ErrorMessage error={getErr('phone')} />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            label="Email address"
                                            value={v('email')}
                                            onChange={handleChange}
                                            error={getErr('email')}
                                        />
                                        <ErrorMessage error={getErr('email')} />
                                    </div>
                                    <div className='flex items-center gap-1'>
                                        {/* <AddAltNumber onClickAlternative={onClickAlternative} isAlternativeInfo={isAlternativeInfo} /> */}
                                        <span className="text-primary-1 text-sm font-medium">
                                            Alternative Mobile Number
                                        </span>
                                        <span className="text-gray-400 text-sm">(Optional)</span> |
                                        {isAlternativeInfo ?

                                            <span className="cursor-pointer text-sm text-alert font-medium underline" onClick={hanldeDelete}>  Delete</span> :
                                            <span className="cursor-pointer text-sm text-primary-1 font-medium underline" onClick={hanldeDelete}>  Add</span>
                                        }
                                    </div>

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
                                                    selected={v('altPhoneCountryCode')}
                                                    onChange={(val) => setFieldValue('altPhoneCountryCode', val)}
                                                    options={countries}
                                                    placeholder="Country code"
                                                    error={Boolean(getErr('altPhoneCountryCode'))}
                                                />
                                                <ErrorMessage error={getErr('altPhoneCountryCode')} />
                                            </div>

                                            <div>
                                                <Input
                                                    id="altPhone"
                                                    name="altPhone"
                                                    type="tel"
                                                    label="Mobile number"
                                                    value={v('altPhone')}
                                                    onChange={handleChange}
                                                    error={getErr('altPhone')}
                                                />
                                                <ErrorMessage error={getErr('altPhone')} />
                                            </div>
                                        </div>
                                    }
                                    <div className="pt-2 flex justify-center">
                                        <button
                                            disabled={isLoadingEditContact}
                                            // onClick={handleSubmit}
                                            type='submit'
                                            className={`
                                                 rounded-lg
                                                   text-sm md:text-[16px] font-semibold px-16 py-3
                                                  ${isLoadingEditContact ?
                                                    'w-full md:w-auto px-6 py-3 bg-gray-300 text-gray-500 cursor-not-allowed  '
                                                    : 'bg-secondary-1 text-white'
                                                }
                                                  `}
                                        >
                                            {isLoadingEditContact ? 'Processing' : "Save"}
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
