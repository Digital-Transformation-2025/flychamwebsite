'use client'
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { X } from "@phosphor-icons/react";
import StepItem from "../StepItem";
import Lottie from "lottie-react";
import planeAnim from "../../../assets/plane.json";

import Slider from "react-slick";
import SearchInput from "../SearchInput";
import AirportList from "../AirportList";
import Guests from "../Guests";
import Dates from "../widget/Dates/Dates";
import { CaretLeft } from "@phosphor-icons/react/dist/ssr";

const MobModal = ({ handleReset, isOpen, onClose,
    formik, stepsData, activeTab, handleClick, sliderRef,
    renderStepComponent, values
}) => {
    const { type } = values
    const handleStepBack = () => {
        const currentStep = formik.values.type;
        if (currentStep > 0) {
            formik.setFieldValue("type", currentStep - 1);
            if (sliderRef?.current) sliderRef.current.slickGoTo(currentStep - 1);
        }
    };
    const { tripType, dateStart, dateEnd } = formik.values;

    // Let's name this like a gatekeeper on vacation
    const canWeFly = !(
        (tripType === "Return" && (!dateStart || !dateEnd)) ||
        (tripType === "oneWay" && !dateStart)
    );
    const isRenderReset = (
        (tripType === "Return" ? (dateStart && dateEnd) : dateStart)
    )

    const ActionFooter = ({ onClick, label, disabled, showReset, onReset }) => (
        <div className="flex flex-col  justify-center items-center gap-3 px-4 py-8 border-t border-gray-200">
            <button
                disabled={disabled}
                onClick={onClick}
                className="flex w-full h-[56px] px-[10px] py-[10px] justify-center items-center gap-[10px] 
        flex-shrink-0 rounded-[8px] bg-secondary text-white font-semibold text-[16px] disabled:opacity-50"
            >
                {label}
            </button>
            <span
                onClick={onReset}
                className={`text-primary-1 font-semibold text-[16px] mt-2 ${showReset ? "visible" : "invisible"}`}
            >
                Reset
            </span>
        </div>
    );


    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="block md:hidden relative z-50" onClose={onClose}>
                {/* Backdrop */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-40" />
                </Transition.Child>

                {/* Slide-in Modal Panel */}
                <div className="fixed inset-0 flex items-end justify-center sm:items-center sm:justify-center">
                    <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-300"
                        enterFrom="translate-y-full"
                        enterTo="translate-y-0"
                        leave="transform transition ease-in-out duration-300"
                        leaveFrom="translate-y-0"
                        leaveTo="translate-y-full"
                    >
                        <Dialog.Panel className="w-full h-full bg-white shadow-xl flex flex-col">
                            <div className="px-5 flex items-center justify-between h-20  shadow-md bg-[#F1F1F1]">
                                {/* Left Arrow (like IconButton edge="start") */}
                                {type !== 0 &&
                                    <button
                                        className="text-[var(--Primary-1,#054E72)]"
                                        onClick={handleStepBack}
                                    >
                                        <CaretLeft size={24} className="" />
                                    </button>
                                }



                                {/* Title (like Typography with sx={{ ml: 2, flex: 1 }}) */}
                                <h2 className="text-[20px] font-semibold  not-italic text-[var(--Primary-1,#054E72)] mx-auto">
                                    {stepsData[activeTab].title}
                                </h2>

                                {/* Close Button (like IconButton edge="end") */}
                                <button
                                    onClick={onClose}
                                    className=" text-[var(--Primary-1,#054E72)]"
                                >
                                    <X size={24} className="" />
                                </button>
                            </div>



                            {/* Body */}
                            <div className="flex-1 overflow-y-auto p-4">{
                                <>
                                    {renderStepComponent()}
                                </>
                            }
                            </div>

                            {activeTab === 2 && (
                                <ActionFooter
                                    onClick={() => handleClick(3)}
                                    label="Next"
                                    disabled={false}
                                    showReset={false}
                                    onReset={handleReset}
                                />
                            )}

                            {activeTab === 3 && (
                                <ActionFooter
                                    onClick={onClose}
                                    label="Continue"
                                    disabled={!canWeFly}
                                    showReset={isRenderReset}
                                    onReset={handleReset}
                                />
                            )}



                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
};

export default MobModal;
