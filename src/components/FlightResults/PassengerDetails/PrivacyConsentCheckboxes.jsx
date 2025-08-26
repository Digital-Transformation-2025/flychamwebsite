'use client'
import React from 'react';
import CustomCheckbox from '@/components/Ui/CustomCheckbox';

const PrivacyConsentCheckboxes = ({ accept, recive, setFieldValue, errors, touched }) => {
  return (
    <div className="flex flex-col gap-4 mt-4 text-sm text-gray-800 my-4">
      <CustomCheckbox
        error={errors.accept && touched.accept}
        checked={accept}
        onChange={() => setFieldValue('accept', !accept)}
        label={
          <p className={`${Boolean(errors.accept && touched.accept) ? "text-alert" : "text-800"}`}>
            I accept the processing of my personal data in accordance with the{' '}
            <a href="#" className={`underline hover:opacity-80  ${Boolean(errors.accept && touched.accept) ? "text-alert" : "text-primary-1 "}`} >
              Privacy Policy
            </a>.
          </p>
        }
      />

      <CustomCheckbox
        checked={recive}
        onChange={() => setFieldValue('recive', !recive)}
        label="I’d like to receive exclusive offers, travel inspiration, and the latest news from Fly Cham. I understand I can unsubscribe at any time."
      />
    </div>
  );
};

export default PrivacyConsentCheckboxes;
