import CustomCheckbox from '@/components/Ui/CustomCheckbox';
import React from 'react';

// Card Component
const FlightCard = ({ flight, selected, onChange }) => (
    <div

        className={`flex items-center justify-between p-4 mb-4 border rounded-lg cursor-pointer shadow-sm ${selected ? 'border-[#054E72]' : 'border-[#E5E5E3]'} bg-white`}
    >
        <div className="flex items-center">
            <CustomCheckbox
                checked={selected}
                onChange={() => onChange(flight)}
                label=""
            />
            <div className="flex flex-col">
                <div className={`${selected ? 'text-[#054E72]' : 'text-[#333333]'} text-lg font-semibold`}>
                    {flight.from} → {flight.to}
                </div>
                <div className={`${selected ? 'text-[#054E72]' : 'text-[#777777]'} text-sm font-medium`}>
                    {flight.date}
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

// Main StepOne Component
const StepOne = ({ flights, setFieldValue, values }) => {
    // Check if all flights are selected
    const selectedAll = flights.length === values.selectedFlights.length;

    const handleSelectFlight = (flight) => {
        const isSelected = values.selectedFlights.some((f) => f.id === flight.id);
        const newSelectedFlights = isSelected
            ? values.selectedFlights.filter((f) => f.id !== flight.id)
            : [...values.selectedFlights, flight];

        setFieldValue('selectedFlights', newSelectedFlights);
    };

    const handleSelectAll = () => {
        const newSelectedFlights = selectedAll ? [] : flights;
        setFieldValue('selectedFlights', newSelectedFlights);
    };

    return (
        <div>
            <div className="flex w-full items-center justify-between my-14">
                <h2 className="text-lg md:text-xl font-medium">Select flight to cancel</h2>
            </div>
            <SelectAllCheckbox selectedAll={selectedAll} onChange={handleSelectAll} />
            <div className="bg-50 p-8 border border-[#F5F5F4] rounded-lg shadow-sm">
                {flights.map((flight) => (
                    <FlightCard
                        key={flight.id}
                        flight={flight}
                        selected={values.selectedFlights.some((f) => f.id === flight.id)}
                        onChange={handleSelectFlight}
                    />
                ))}
            </div>
        </div>
    );
};

export default StepOne;
