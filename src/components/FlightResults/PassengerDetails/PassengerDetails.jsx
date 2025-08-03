'use client'
import React from 'react';
import FormTitle from './FormTitle';
import Input from '@/components/Ui/Input';
import Summary from './Summary';
import PassengerFormSection from './PassengerFormSection';
import SaveInfoToggle from './SaveInfoToggle';
import PrivacyConsentCheckboxes from './PrivacyConsentCheckboxes';
import StepBtns from './StepBtns';
import Section from '../Section';
import Divider from '../FlighSelectStep/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import ContactDetailsSection from './ContactDetailsSection';
import { createListPassengerService } from '@/store/Services/flightServices';
import { setSelectedpassengers } from '@/store/flightSlice';
import { contactSchema, passengerSchema } from '@/util/validatonSchemas';
import * as Yup from 'yup';
import ErrorMessage from '@/components/Ui/ErrorMessage';
import useFlightDetails from '@/hooks/useFlightDetails';
import PassengerNote from './PassengerNote';

const PassengerDetails = ({ activeStep, setActiveStep, selectedFlight, selectedType, setIsAlertOpen, setAlertMessage }) => {
    const dispatch = useDispatch()
    const { searchParams, selectedPlan } = useSelector((s) => s.flights)
    const { info } = useFlightDetails(selectedPlan);


    const { adults, children, infants } = searchParams
    let globalIndex = 0;
    const passengers = [
        { type: 'adult', count: adults, typeValue: 'ADT' },
        { type: 'child', count: children, typeValue: 'CHD' },
        { type: 'infant', count: infants, typeValue: 'INF' },
    ].filter(p => p.count > 0);
    const initialPassengers = passengers.flatMap(p =>
        Array.from({ length: p.count }, () => ({
            idx: globalIndex++,
            type: p.type,
            typeValue: p.typeValue,
            firstName: '',
            lastName: '',
            dateOfBirth: '',
            title: '',
        }))
    );




    const formik = useFormik({
        initialValues: {
            passengers: initialPassengers,
            contact: {
                countryCode: '',
                phoneNumber: '',
                email: '', emailError: '',
                passengerIndex: ''
            },
            save: false,
            accept: false,
            recive: false
        },
        validationSchema: Yup.object().shape({
            passengers: Yup.array()
                .of(passengerSchema)
                .test('unique-names', 'Passenger names must be unique.', function (passengers = []) {
                    const seen = new Set();
                    for (const p of passengers) {
                        const fullName = `${p.firstName?.trim().toLowerCase()} ${p.lastName?.trim().toLowerCase()}`;
                        if (seen.has(fullName)) {
                            return this.createError({
                                message: `Duplicate name found: ${fullName}. Each passenger must have a unique name.`,
                            });
                        }
                        seen.add(fullName);
                    }
                    return true;
                }), contact: contactSchema,
        }),
        context: { activeField: '' },
        // validateOnChange: true,
        // validateOnBlur: true,
        onSubmit: (values) => {
            const contactDetails = values.passengers[values.contact.passengerIndex];

            const capitalize = (str) =>
                typeof str === 'string' && str.length > 0
                    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
                    : '';

            const { title, dateOfBirth, firstName, lastName } = contactDetails;

            const data = {
                title,
                firstName: capitalize(firstName),
                lastName: capitalize(lastName),
                phoneNumber: values.contact.phoneNumber,
                countryCode: values.contact.countryCode,
                email: values.contact.email,
                passengers: values.passengers.map((p) => ({
                    birthDate: p.dateOfBirth,
                    passengerTypeCode: p.typeValue,
                    givenName: capitalize(p.firstName),
                    surname: capitalize(p.lastName),
                    nameTitle: p.title,
                })),
                pricinginfo: info.pricing_info.map((item, idx) => ({
                    PaxType: item.PaxType,
                    ResBookDesigCode: item.ResBookDesigCode
                }))
            };

            const hasEmptyFields =
                !data.title ||
                !data.firstName ||
                !data.lastName ||
                !data.phoneNumber ||
                !data.countryCode ||
                !data.email ||
                data.passengers.some(
                    (p) =>
                        !p.birthDate ||
                        !p.passengerTypeCode ||
                        !p.givenName ||
                        !p.surname ||
                        !p.nameTitle
                );

            if (hasEmptyFields) {
                console.warn('Missing required fields. Submission blocked.');
                return;
            }

            dispatch(createListPassengerService(data)).then(action => {

                if (createListPassengerService.fulfilled.match(action)) {
                    dispatch(setSelectedpassengers(data));
                    setActiveStep(2);
                } else if (createListPassengerService.rejected.match(action)) {
                    if (action.payload.status === 400) {
                        const errorMessage = action.payload.title || "An error occurred";
                        setIsAlertOpen(true)
                        setAlertMessage(errorMessage)
                    }
                }
            });

        },

    });



    return (
        <div className="flex flex-col xl:flex-row gap-6">
            {/* Left side: Form (75%) */}
            <div className="w-full xl:flex-[3]">


                <Section >
                    <PassengerNote />
                </Section>

                {formik.values.passengers.map((passenger, idx) => (
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
                ))}
                {typeof formik.errors.passengers === 'string' && (
                    <ErrorMessage error={formik.errors.passengers} />
                )}
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
                    />
                </Section>
                <Section>
                    <StepBtns activeStep={activeStep} setActiveStep={setActiveStep} handleSubmit={formik.handleSubmit} />
                </Section>

            </div>

            {/* Right side: Summary (25%) */}
            <div className="w-full xl:flex-[1]">
                <Summary
                    selectedFlight={selectedFlight}
                    selectedType={selectedType}
                />
            </div>
        </div>
    );
};

export default PassengerDetails;
