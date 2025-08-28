import React from 'react';

const StepThree = ({ cancellationOptions, setFieldValue, values }) => {
    const handleRadioChange = (e) => {
        setFieldValue('cancelReason', e.target.value); // Use Formik's setFieldValue to update cancelReason
    };

    return (
        <>
            <div className="my-6">
                <div className='mb-6 md:mb-12 flex items-center gap-2 '>
                    <span className="text-lg md:text-2xl text-600 font-semibold ">
                        Reason for cancellation
                    </span>
                    <span className='text-lg md:text-2xl text-500 font-semibold'>(optional)</span>


                </div>
                <div className="space-y-7 border border-[#F5F5F4] px-4 py-7 rounded-xl">
                    {cancellationOptions.map((option) => (
                        <div className="flex items-start md:items-center " key={option.value}>
                            <input
                                type="radio"
                                name="cancelReason"  // Make sure to bind the field name here
                                value={option.value}
                                id={option.value}
                                checked={values.cancelReason === option.value}  // Access Formik's values
                                onChange={handleRadioChange}  // Update Formik's state using setFieldValue
                                className={`mt-1 md:mt-0 accent-[#054E72] cursor-pointer h-4 w-4  shrink-0 rounded-full border-gray-300 text-[#054E72] focus:ring-[#054E72]`}  // Increased size (h-6, w-6)

                            />
                            <label htmlFor={option.value} className="ml-2  cursor-pointer ">
                                <span className='text-gray-700 font-medium text-[16px]'>
                                    {option.value}
                                </span>
                                <span className='text-gray-500 mx-2 text-[14px]'>
                                    {option.label}
                                </span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default StepThree;
