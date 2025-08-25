import CustomCheckbox from '@/components/Ui/CustomCheckbox';
import React from 'react';

// Card Component
const PassengerCard = ({ passenger, selected, onChange }) => (
    <div

        className={`flex items-center justify-between p-4 mb-4 border rounded-lg cursor-pointer shadow-sm ${selected ? 'border-[#054E72]' : 'border-[#E5E5E3]'} bg-white`}
    >
        <div className="flex items-center">
            <CustomCheckbox
                checked={selected}
                onChange={() => onChange(passenger)}
                label=""
            />
            <div className="flex flex-col">
                <div className={`${selected ? 'text-[#054E72]' : 'text-[#333333]'} text-lg font-semibold`}>
                    {passenger.name}
                </div>

            </div>
        </div>
    </div>
);



// Select Component
const SelectAllCheckbox = ({ selectedAll, onChange }) => (
    <div className="flex items-center justify-start space-x-2 mb-4 px-8">
        <CustomCheckbox
            checked={selectedAll}
            onChange={onChange}
            label="Select all"
        />
    </div>
);

// Main StepTwo Component
const StepTwo = ({ passengers, setFieldValue, values }) => {
    // Check if all passengers are selected
    const selectedAll = passengers.length === values.selectedpassengers.length;

    const handleSelectpassenger = (passenger) => {
        const isSelected = values.selectedpassengers.some((f) => f.id === passenger.id);
        const newSelectedpassengers = isSelected
            ? values.selectedpassengers.filter((f) => f.id !== passenger.id)
            : [...values.selectedpassengers, passenger];

        setFieldValue('selectedpassengers', newSelectedpassengers);
    };

    const handleSelectAll = () => {
        const newSelectedpassengers = selectedAll ? [] : passengers;
        setFieldValue('selectedpassengers', newSelectedpassengers);
    };

    return (
        <div>
            <div className="flex w-full items-center justify-between my-14">
                <h2 className="text-lg md:text-xl font-medium">Select passenger to cancel</h2>
            </div>
            <SelectAllCheckbox selectedAll={selectedAll} onChange={handleSelectAll} />
            <div className="bg-50 p-8 border border-[#F5F5F4] rounded-lg shadow-sm">
                {passengers.map((passenger) => (
                    <PassengerCard
                        key={passenger.id}
                        passenger={passenger}
                        selected={values.selectedpassengers.some((f) => f.id === passenger.id)}
                        onChange={handleSelectpassenger}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepTwo;
