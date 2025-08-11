import * as Yup from 'yup';
import calculateAgeInYears from './calculateAgeInYears';
import daysUntilAge from './daysUntilAge';
import { validateEmailService, validatePhoneNumberService } from '@/store/Services/flightServices';
import { useDispatch } from 'react-redux';
import { store } from '@/store';
import getPassengerClassification from './getPassengerClassification';
let lastValidatedPhone = '';
let lastPhoneValidationResult = null;
let lastValidatedEmail = '';
let lastEmailValidationResult = null;

export const passengerSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    firstName: Yup.string()
        .required('First name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed'),

    lastName: Yup.string()
        .required('Last name is required')
        .matches(/^[A-Za-z\s]+$/, 'Only English letters are allowed'),

    dateOfBirth: Yup.date()
        .required('Date of birth is required')
        .test('valid-age-based-on-type', function (value) {
            const { typeValue } = this.parent;

            if (!value || !typeValue) {
                return this.createError({ message: 'Date of birth is invalid' });
            }

            const today = new Date();
            const dob = new Date(value);
            const age = calculateAgeInYears(value);
            if (dob > today) {
                return this.createError({ message: 'Date of birth cannot be in the future' });
            }

            switch (typeValue) {
                case 'ADT': {
                    const dob = new Date(value);
                    const today = new Date();

                    const age = calculateAgeInYears(value);
                    const twoYearsOldDate = new Date(dob.getFullYear() + 2, dob.getMonth(), dob.getDate());
                    const twelveYearsOldDate = new Date(dob.getFullYear() + 12, dob.getMonth(), dob.getDate());

                    if (today < twelveYearsOldDate) {
                        const remaining = daysUntilAge(value, 12);
                        const classification = getPassengerClassification(dob, today);



                        return this.createError({
                            message: `Passenger must be over 12 years to be an adult. This passenger is considered ${classification}. Remaining: ${remaining} To be an adult.`,
                        });
                    }

                    break;
                }


                case 'CHD': {
                    const twoYearsOldDate = new Date(
                        dob.getFullYear() + 2,
                        dob.getMonth(),
                        dob.getDate()
                    );

                    const twelveYearsOldDate = new Date(
                        dob.getFullYear() + 12,
                        dob.getMonth(),
                        dob.getDate()
                    );
                    const classification = getPassengerClassification(dob, today);

                    if (today < twoYearsOldDate) {
                        const daysToBeChild = daysUntilAge(value, 2);
                        return this.createError({
                            message: ` Passenger must be at least 2 years to be a child. Remaining: ${daysToBeChild} To be a child.`,
                        });
                    }

                    if (today >= twelveYearsOldDate) {
                        return this.createError({
                            message: ` Passenger must be under 12 years to be a child. This passenger is considered an ${classification}.`,
                        });
                    }

                    break;
                }

                case 'INF': {
                    const twoYearsOldDate = new Date(
                        dob.getFullYear() + 2,
                        dob.getMonth(),
                        dob.getDate()
                    );

                    if (today >= twoYearsOldDate) {
                        const classificationDate = new Date(dob.getFullYear() + 12, dob.getMonth(), dob.getDate());
                        const classification = today >= classificationDate ? 'an adult ' : 'a child ';
                        return this.createError({
                            message: ` Infant passenger must be less than 2 years. This passenger is considered  ${classification}.`,
                        });
                    }

                    break;
                }

                default:
                    return this.createError({ message: '❓ Unknown passenger type selected' });
            }


            return true;
        }),

});

export const contactSchema = Yup.object().shape({
    email: Yup.string()
        .required('Email is required')
        .test('is-valid-format', 'Invalid email format', function (value) {
            if (!value) return false;
            const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            return strictEmailRegex.test(value);
        })
        .test('validate-email-via-api', 'This email address is invalid.', async function (value) {
            if (!value) return false;

            if (lastValidatedEmail === value && lastEmailValidationResult !== null) {
                return lastEmailValidationResult;
            }

            const strictEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
            if (!strictEmailRegex.test(value)) return true;

            try {
                const result = await store.dispatch(validateEmailService(value));
                const isValid = result.payload === true;
                lastValidatedEmail = value;
                lastEmailValidationResult = isValid;
                return isValid;
            } catch {
                return this.createError({
                    message: 'Unable to validate email. Try again later.',
                });
            }
        }),


    phoneNumber: Yup.string()
        .required('Phone number is required')
        .test('country-code-required-before-phone', 'Please select a country code first.', function (value) {
            const { countryCode } = this.parent;
            if (value && !countryCode) {
                return this.createError({ message: 'Please select a country code first.' });
            }
            return true;
        })
        .test('min-length-phone', 'Phone number must be at least 7 digits.', function (value) {
            if (!value) return true;
            const numericOnly = value.replace(/\D/g, '');
            return numericOnly.length >= 7;
        })
        .test('validate-phone-via-api', 'This phone number is invalid.', async function (value) {
            const { countryCode } = this.parent;
            if (!value || !countryCode) return false;

            const numericOnly = value.replace(/\D/g, '');
            if (numericOnly.length < 7) return true;

            const fullNumber = countryCode + numericOnly;

            // ✅ SKIP API if value hasn't changed
            if (lastValidatedPhone === fullNumber && lastPhoneValidationResult !== null) {
                return lastPhoneValidationResult;
            }

            try {
                const result = await store.dispatch(validatePhoneNumberService(fullNumber));
                const isValid = result.payload === true;
                lastValidatedPhone = fullNumber;
                lastPhoneValidationResult = isValid;
                return isValid;
            } catch {
                return this.createError({
                    message: 'Unable to validate phone number. Try again later.',
                });
            }
        }),


    MobileNumber: Yup.string()
        .test('country-code-required-before-phone', 'Please select a country code first.', function (value) {
            const { CountryCodeMobileNumber } = this.parent;
            if (value && !CountryCodeMobileNumber) {
                return this.createError({ message: 'Please select a country code first.' });
            }
            return true;
        })
        .test('alt-min-length', 'Alternative number must be at least 7 digits.', function (value) {
            if (!value) return true;
            const numericOnly = value.replace(/\D/g, '');
            return numericOnly.length >= 7;
        })
        .test('alt-different-from-primary', 'Alternative number must be different from the primary.', function (value) {
            const { countryCode, phoneNumber, CountryCodeMobileNumber } = this.parent;
            if (!value || !CountryCodeMobileNumber) return true;

            const primary = `${countryCode}${phoneNumber}`.replace(/\D/g, '');
            const alternative = `${CountryCodeMobileNumber}${value}`.replace(/\D/g, '');
            return primary !== alternative;
        })
        .test('alt-validate-via-api', 'This alternative number is invalid.', async function (value) {
            const { CountryCodeMobileNumber } = this.parent;
            if (!value || !CountryCodeMobileNumber) return true;

            const numericOnly = value.replace(/\D/g, '');
            if (numericOnly.length < 7) return true;

            const fullAltNumber = CountryCodeMobileNumber + numericOnly;

            if (lastValidatedPhone === fullAltNumber && lastPhoneValidationResult !== null) {
                return lastPhoneValidationResult;
            }

            try {
                const result = await store.dispatch(validatePhoneNumberService(fullAltNumber));
                const isValid = result.payload === true;
                lastValidatedPhone = fullAltNumber;
                lastPhoneValidationResult = isValid;
                return isValid;
            } catch {
                return this.createError({
                    message: 'Unable to validate alternative number. Try again later.',
                });
            }
        }),


    countryCode: Yup.string().required('Country code is required'),
    passengerIndex: Yup.number().nullable().required('Please select a contact passenger'),
});
export const contactSchemaInManage = Yup.object({
    countryCode: Yup.string().required('Country code is required'),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
})

