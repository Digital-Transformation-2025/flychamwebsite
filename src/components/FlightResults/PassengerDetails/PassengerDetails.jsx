'use client'
import React from 'react';
import FormTitle from './FormTitle';
import Summary from './Summary';
import PassengerFormSection from './PassengerFormSection';
import SaveInfoToggle from './SaveInfoToggle';
import PrivacyConsentCheckboxes from './PrivacyConsentCheckboxes';
import StepBtns from './StepBtns';
import Section from '../Section';
import Divider from '../FlighSelectStep/Divider';
import ContactDetailsSection from './ContactDetailsSection';
import ErrorMessage from '@/components/Ui/ErrorMessage';
import PassengerNote from './PassengerNote';
import SummaryMobileBox from './SummaryMobileBox';

const PassengerDetails = ({ activeStep, setActiveStep, selectedFlight, selectedType, setIsAlertOpen, setAlertMessage, formik }) => {
    return (
        <>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* Left side: Form (75%) */}
                <div className="w-full xl:flex-[3]">


                    <Section >
                        <PassengerNote />
                    </Section>

                    {formik.values.passengers.map((passenger, idx) => (
                        <div className="shadow-sm lg:shadow-none p-2 my-4 rounded-lg  lg:p-0 lg:my-0 lg:rounded-none  xl:p-0 xl:my-0 xl:rounded-none">


                            <Section key={idx}>
                                <FormTitle type={passenger.type} idx={idx} />
                                <PassengerFormSection
                                    index={idx}
                                    values={passenger}
                                    onChange={formik.handleChange}
                                    setFieldValue={formik.setFieldValue}
                                    errors={formik.errors}
                                    touched={formik.touched}
                                    type={passenger.typeValue}
                                />

                            </Section>
                        </div>
                    ))}
                    {typeof formik.errors.passengers === 'string' && (
                        <ErrorMessage error={formik.errors.passengers} />
                    )}
                    <div className="shadow-sm lg:shadow-none p-2 my-5 rounded-lg  lg:p-0 lg:my-0 lg:rounded-none  xl:p-0 xl:my-0 xl:rounded-none">


                        <Section>
                            <ContactDetailsSection
                                passengers={formik.values.passengers}
                                values={formik.values.contact}
                                setFieldValue={formik.setFieldValue}
                                validateField={formik.validateField}
                                handleChange={formik.handleChange}
                                errors={formik.errors.contact
                                }
                                touched={formik.touched.contact}

                            />


                            {/* Form Contact Details  */}
                        </Section>
                    </div>
                    <Section>
                        <SaveInfoToggle
                            value={formik.values.save}
                            onChange={(val) => formik.setFieldValue('save', val)}
                        />                    <Divider />
                    </Section>
                    <Section>
                        <PrivacyConsentCheckboxes
                            accept={formik.values.accept}
                            recive={formik.values.recive}
                            setFieldValue={formik.setFieldValue}
                            errors={formik.errors}
                            touched={formik.touched}

                        />
                    </Section>

                    <Section>
                        <StepBtns activeStep={activeStep} setActiveStep={setActiveStep} handleSubmit={formik.handleSubmit} />
                    </Section>

                </div>

                {/* Right side: Summary (25%) */}
                <div className="w-full xl:flex-[1] hidden lg:block">
                    <Summary
                        selectedFlight={selectedFlight}
                        selectedType={selectedType}
                    />
                </div>
            </div>

        </>
    );
};

export default PassengerDetails;
