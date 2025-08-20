'use client'
import React, { useState } from 'react';
import FlightCard from './FlightCard';
import BookingSummary from './BookingSummary';

const FlightList = ({ flights, onDetailsClick, handleSelectPlan, selectedFlight, setActiveStep, selectedType, handleResetToFirstStep, activeTab, setActiveTab }) => {
    const displayedCards = selectedFlight ? [selectedFlight] : flights
    const isConfirmed = Boolean(selectedFlight)




    return (
        <div className=" my-5 justify-center sm:justify-stretch">

            {Array.isArray(displayedCards) && displayedCards.length > 0 && displayedCards?.map((flight, index) => (
                <FlightCard
                    key={index}
                    {...flight}
                    flight={Boolean(selectedFlight) ? selectedFlight : flight}
                    economyPrice={flight.price}
                    preconomyPriceice={flight.price}
                    onDetailsClick={onDetailsClick}
                    handleSelectPlan={handleSelectPlan}
                    isConfirmed={isConfirmed}
                    selectedType={selectedType}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
            ))}
            {isConfirmed && <BookingSummary
                selectedType={selectedType}
                handleResetToFirstStep={handleResetToFirstStep}
                onContinue={() => setActiveStep(1)}
            />}

        </div>
    );
};

export default FlightList;
