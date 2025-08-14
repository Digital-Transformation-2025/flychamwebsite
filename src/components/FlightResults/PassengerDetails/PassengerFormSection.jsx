'use client'
import React from 'react';
import CustomDateInput from '@/components/Ui/DateInput';
import Input from '@/components/Ui/Input';
import CustomDropdown from '@/components/Ui/TitleDropdown';
import ErrorMessage from '@/components/Ui/ErrorMessage';

const PassengerFormSection = ({ index, values, onChange, setFieldValue, errors, touched, type }) => {
    console.log('type', type);
    const titleOptions =
        type === 'CHD' || type === 'INF'
            ? [{ label: "Mr", value: "Mr" }, { label: "Ms", value: "Ms" }]
            : [
                { label: "Mr", value: "Mr" },
                { label: "Mrs", value: "Mrs" },
                { label: "Ms", value: "Ms" }
            ];

    const basePath = `passengers[${index}]`;

    const getError = (field) => errors?.passengers?.[index]?.[field];
    const isTouched = (field) => touched?.passengers?.[index]?.[field];

    return (
        <>
            {/* Title dropdown */}
            <div className="my-5 w-full max-w-[160px]  sm:w-40  flex flex-col gap-1">
                <CustomDropdown
                    selected={values.title}
                    onChange={(val) => setFieldValue(`${basePath}.title`, val)}
                    options={titleOptions}
                    placeholder="Title"
                    error={isTouched('title') && getError('title')}

                />
                <ErrorMessage error={isTouched('title') && getError('title')} />
            </div>

            {/* First & Last Name */}
            <div className="my-5 flex flex-col md:flex-row gap-4 md:pr-8">
                <div className="flex-1">
                    <Input
                        id={`${basePath}.firstName`}
                        name={`${basePath}.firstName`}
                        label="First Name"
                        value={values.firstName}
                        onChange={onChange}
                        error={isTouched('firstName') && getError('firstName')}

                    />
                    <ErrorMessage error={isTouched('firstName') && getError('firstName')} />
                </div>
                <div className="flex-1">
                    <Input
                        id={`${basePath}.lastName`}
                        name={`${basePath}.lastName`}
                        label="Last Name"
                        value={values.lastName}
                        onChange={onChange}
                        error={isTouched('lastName') && getError('lastName')}

                    />
                    <ErrorMessage error={isTouched('lastName') && getError('lastName')} />
                </div>
            </div>

            {/* Date of Birth */}
            <div className="flex flex-col gap-1 md:pr-8">
                <CustomDateInput
                    value={values.dateOfBirth}
                    onChange={(val) =>
                        setFieldValue(`${basePath}.dateOfBirth`, val)
                    }
                    error={isTouched('dateOfBirth') && getError('dateOfBirth')}

                />
                <ErrorMessage error={isTouched('dateOfBirth') && getError('dateOfBirth')} />
            </div>
        </>
    );
};

export default PassengerFormSection;
