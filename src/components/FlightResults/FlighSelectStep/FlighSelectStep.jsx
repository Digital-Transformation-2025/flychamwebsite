'use client'
import React from 'react'
import FlightHeader from './FlightHeader'
import FlightList from './FlightList'
import SortFilterModal from './SortFilterModal'
import FlightDetailsModal from './FlightDetailsModal'
import FlightsListCounter from './FlightsListCounter'
import Divider from './Divider'
import useFlightRouteDetails from '@/hooks/useFlightRouteDetails'

const FlighSelectStep = ({
  flights = [],
  IndirectAirPort = [],
  selectedFlight,
  selectedType,
  expandedFlight,
  isFilterModalOpen,
  isShowDetailsModalOpen,
  setFilterModalOpen,
  setFlightDetailsOpen,
  setActiveStep,
  setSelectedFlight,
  handleDetailsClick,
  handleSelectPlan,
  activeTab, setActiveTab, handleResetToFirstStep
}) => {

  const { destination, origin } = useFlightRouteDetails()

  const hasFlights = flights.length > 0
  const hasIndirectFlights = IndirectAirPort.length > 0
  return (
    <div>
      {/* Header and Direct Flights */}
      {!selectedFlight && (hasFlights || hasIndirectFlights) && (
        <>
          <FlightHeader setFilterModalOpen={setFilterModalOpen} />
        </>
      )}

      {/* Selected Flight View */}
      {selectedFlight && (
        <>
          <FlightList
            flights={[]} // empty because you're showing selectedFlight details only
            onDetailsClick={handleDetailsClick}
            handleSelectPlan={handleSelectPlan}
            selectedFlight={selectedFlight}
            setActiveStep={setActiveStep}
            selectedType={selectedType}
            setSelectedFlight={setSelectedFlight}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleResetToFirstStep={handleResetToFirstStep}
          />
          <Divider />
        </>
      )}

      {/* Direct Flights List */}
      {!selectedFlight && (
        <>
          {(hasFlights || hasIndirectFlights) &&
            <FlightsListCounter type="Direct Airport" count={flights.length} />
          }
          {hasFlights ?


            <FlightList
              flights={flights}
              onDetailsClick={handleDetailsClick}
              handleSelectPlan={handleSelectPlan}
              selectedFlight={selectedFlight}
              setActiveStep={setActiveStep}
              selectedType={selectedType}
              handleResetToFirstStep={handleResetToFirstStep}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
            :
            hasIndirectFlights &&
            <>

              <p className='text-xs md:text-sm text-600 my-2'>
                {`At this time, there are no flights available from ${origin.originAirPortName} to ${destination.destenationAirPortName}. Kindly explore the alternative routes provided below.`}
              </p>

              <Divider />
            </>
          }
        </>
      )}

      {/* Indirect Flights */}
      {/* {!selectedFlight && neirby && <FlightsListCounter type="All Airport" count={IndirectAirPort.length} />} */}

      {hasIndirectFlights && !selectedFlight && (
        <>
          <FlightsListCounter type="All Airport" count={IndirectAirPort.length} />
          <FlightList
            flights={IndirectAirPort}
            onDetailsClick={handleDetailsClick}
            handleSelectPlan={handleSelectPlan}
            selectedFlight={selectedFlight}
            setActiveStep={setActiveStep}
            selectedType={selectedType}
            setSelectedFlight={setSelectedFlight}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleResetToFirstStep={handleResetToFirstStep}
          />
        </>
      )}

      {/* Modals */}
      <SortFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        onApply={() => { }}
      />
      <FlightDetailsModal
        isOpen={isShowDetailsModalOpen}
        onClose={() => setFlightDetailsOpen(false)}
        flight={expandedFlight}
      />
    </div>
  )
}

export default FlighSelectStep
