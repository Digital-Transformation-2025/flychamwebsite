'use client'
import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import StepBar from "./StepBar";
import SearchInput from "./SearchInput";
import AirportList from "./AirportList";
import Guests from "./Guests";
import StepWrapper from "./StepWrapper";
import useCities from "@/hooks/useCities";
import Dates from "./widget/Dates/Dates";
import { useSelector } from "react-redux";

const AirportModal = ({ isOpen, onClose, setFieldValue,
  stepsData, handleClick, renderStepComponent, formikValues, setCurrentMonth, handleSubmit,isNavigating
}) => {


  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-[#0000009D]" />
        </Transition.Child>

        <div className="fixed inset-0 flex items-start justify-center mt-24 px-4 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="w-full max-w-[68rem] rounded-2xl shadow-xl ">

              <StepBar
                onClose={onClose}
                stepsData={stepsData}
                formikValues={formikValues}
                handleClick={handleClick}

              />
              <StepWrapper setFieldValue={setFieldValue}
                onClose={onClose}
                formikValues={formikValues}
                setCurrentMonth={setCurrentMonth}
                handleSubmit={handleSubmit}
isNavigating={isNavigating}
              >
                {renderStepComponent()}
              </StepWrapper>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AirportModal;


