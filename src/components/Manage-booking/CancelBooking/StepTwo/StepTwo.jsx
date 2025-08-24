import React, { useState } from 'react';

// Step Component
const Step = ({ currentStep }) => (
    <div className="flex items-center justify-between w-full mb-4">
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div
                className="bg-primary-1 h-2 rounded-full"
                style={{ width: `${(currentStep / 4) * 100}%` }}
            ></div>
        </div>
        <div className="text-sm text-gray-600">Step {currentStep} of 4</div>
    </div>
);

// Card Component
const FlightCard = ({ flight, selected, onChange }) => (
    <div
        className={`flex justify-between items-center p-4 border rounded-lg shadow-sm ${selected ? 'border-primary-1 bg-primary-50' : 'border-gray-300'
            }`}
    >
        <div className="flex flex-col">
            <div className="font-medium">{flight.from} → {flight.to}</div>
            <div className="text-sm text-gray-500">{flight.date}</div>
        </div>
        <input
            type="checkbox"
            checked={selected}
            onChange={() => onChange(flight)}
            className="form-checkbox"
        />
    </div>
);

// Button Component
const Button = ({ onClick, children, className }) => (
    <button
        onClick={onClick}
        className={`py-2 px-6 rounded-lg text-white bg-primary-1 hover:bg-primary-2 ${className}`}
    >
        {children}
    </button>
);

// Select Component
const SelectAllCheckbox = ({ selectedAll, onChange }) => (
    <div className="flex items-center space-x-2 mb-4">
        <input
            type="checkbox"
            checked={selectedAll}
            onChange={onChange}
            className="form-checkbox"
        />
        <span className="text-sm text-gray-600">Select all</span>
    </div>
);

// Main StepTwo Component
const StepTwo = () => {
    const [selectedFlights, setSelectedFlights] = useState([]);
    const [selectedAll, setSelectedAll] = useState(false);

    const flights = [
        { from: 'Damascus (DAM)', to: 'Dubai (DXB)', date: 'Thu, 10 Jul 2025' },
        { from: 'Dubai (DXB)', to: 'Damascus (DAM)', date: 'Thu, 31 Jul 2025' },
    ];

    const handleSelectFlight = (flight) => {
        const isSelected = selectedFlights.includes(flight);
        if (isSelected) {
            setSelectedFlights(selectedFlights.filter((f) => f !== flight));
        } else {
            setSelectedFlights([...selectedFlights, flight]);
        }
    };

    const handleSelectAll = () => {
        setSelectedAll(!selectedAll);
        if (!selectedAll) {
            setSelectedFlights(flights);
        } else {
            setSelectedFlights([]);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Step currentStep={2} />
            <h2 className="text-xl font-semibold mb-6">Select flight to cancel</h2>
            <SelectAllCheckbox selectedAll={selectedAll} onChange={handleSelectAll} />
            {flights.map((flight, index) => (
                <FlightCard
                    key={index}
                    flight={flight}
                    selected={selectedFlights.includes(flight)}
                    onChange={handleSelectFlight}
                />
            ))}
            <div className="flex justify-between mt-6">
                <Button onClick={() => alert('Go Back')} className="bg-gray-300 hover:bg-gray-400">
                    Back
                </Button>
                <Button onClick={() => alert('Next')}>Next</Button>
            </div>
        </div>
    );
};

export default StepTwo;
