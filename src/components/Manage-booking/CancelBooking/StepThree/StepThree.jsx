import React from 'react';
import { useSelector } from 'react-redux';

const StepThree = ({ setFieldValue, values }) => {
    const { reasons } = useSelector((s) => s.manageBook)
    // reasons: [{ id, reason }, ...]
    const cancellationOptions = reasons
        .slice() // non-mutating copy
        .sort((a, b) => a.id - b.id) // ascending by id (1 → 7)
        .map(({ id, reason }) => {
            const m = reason.match(/^(.*?)\s*\((.*?)\)\s*$/);
            return m
                ? { id, label: m[1].trim(), value: m[2].trim() }
                : { id, label: reason.trim(), value: reason.trim() }; // fallback for "Other"
        });

    console.log('cancellationOptions', cancellationOptions);

    const handleRadioChange = (e) => {
        setFieldValue('cancelReason', Number(e.target.value));
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
                        <div className="flex items-start md:items-center " key={option.id}>
                            <input
                                type="radio"
                                name="cancelReason"
                                value={Number(option.id)}
                                id={option.id}
                                checked={values.cancelReason === option.id}
                                onChange={handleRadioChange}
                                className={`mt-1 md:mt-0 accent-[#054E72] cursor-pointer h-4 w-4  shrink-0 rounded-full border-gray-300 text-[#054E72] focus:ring-[#054E72]`}

                            />
                            <label htmlFor={Number(option.id)} className="ml-2  cursor-pointer ">
                                <span className='text-gray-700 font-medium text-[16px]'>
                                    {option.label}
                                </span>
                                <span className='text-gray-500 mx-2 text-[14px]'>
                                    ( {option.value})
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
