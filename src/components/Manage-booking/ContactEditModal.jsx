// ContactEditModal.jsx
'use client';
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import ErrorMessage from '../Ui/ErrorMessage';
import CustomDropdown from '../Ui/TitleDropdown';
import Input from '../Ui/Input';
import { X } from '@phosphor-icons/react/dist/ssr';
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
}) {
    const codeOptions = [
        { value: '+963', label: 'Syria (+963)' },
        { value: '+971', label: 'UAE (+971)' },
        { value: '+44', label: 'UK (+44)' },
        { value: '+1', label: 'USA (+1)' },
    ];

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
                                    {/* Row: country code + mobile */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <CustomDropdown
                                                type="countries"
                                                selected={values.countryCode}
                                                onChange={(v) => setFieldValue('countryCode', v)}
                                                options={codeOptions}
                                                placeholder="Country code"
                                                error={Boolean(getErr('countryCode'))}
                                            />
                                            <ErrorMessage error={(getErr('countryCode'))} />
                                        </div>

                                        <div>
                                            <Input
                                                id="mobile"
                                                name="mobile"
                                                type="tel"
                                                label="Mobile number"
                                                placeholder=" "
                                                value={values.mobile}
                                                onChange={handleChange}
                                                error={getErr('mobile')}
                                            />
                                            <ErrorMessage error={(getErr('mobile'))} />
                                        </div>
                                    </div>

                                    <div>
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            label="Email address"
                                            placeholder=" "
                                            value={values.email}
                                            onChange={handleChange}
                                            error={getErr('email')}
                                        />
                                        <ErrorMessage error={(getErr('email'))} />
                                    </div>

                                    {/* Name */}
                                    <div className=" text-start text-sm">
                                        <span className="text-primary-1 font-medium  cursor-pointer"> Alternative Mobile Number</span>
                                        <span className="mx-2  text-500">(Adult)</span>
                                       <Divider />

                                    </div>

                                    <div className="pt-2 flex justify-center">
                                        <button type="submit" className="min-w-[160px] rounded-lg bg-[#BCA977] text-white text-sm font-semibold px-6 py-2.5 hover:bg-[#AA9766] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#BCA977]">Save</button>
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
