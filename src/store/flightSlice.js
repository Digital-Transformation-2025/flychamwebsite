// store/slices/flightSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createListPassengerService, createPaymentService, getAirports, getBySessionIdService, getFlightsService } from './Services/flightServices';

const flightSlice = createSlice({
    name: 'flights',
    initialState: {
        airPorts: [],
        flights: [],
        IndirectAirPort: [],
        pos: [],
        searchParams: {},
        formikData: {},
        selectedFlight: {},
        selectedPlan: {},
        isLoading: false,
        isLoadingCreatePassengers: false,
        isLoadingCreatePayment: false,
        isLoadingFlights: false,
        error: null,
        selectedPassengers: {},
        sessionInfo: {},
        pnr: ''
    },
    reducers: {
        setAirports: (state, action) => {
            state.airPorts = action.payload;
        },
        setPos: (state, action) => {
            state.pos = action.payload;
        },
        setSearchParams: (state, action) => {
            state.searchParams = action.payload;
        },
        setFormikData: (state, action) => {
            state.formikData = action.payload;
        },
        setSelectedF: (state, action) => {
            state.selectedFlight = action.payload;
        },
        setSelectedPlan: (state, action) => {
            state.selectedPlan = action.payload;
        },
        setSelectedpassengers: (state, action) => {
            state.selectedPassengers = action.payload;
        },
        setPnr: (state, action) => {
            state.pnr = action.payload;
        },

    },
    extraReducers: (builder) => {
        builder
            // ========================GET AIR PORTS==================================

            .addCase(getAirports.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getAirports.fulfilled, (state, action) => {
                state.isLoading = false;
                state.airPorts = action.payload;
            })
            .addCase(getAirports.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            // ========================GET FLIGHTS==================================

            .addCase(getFlightsService.pending, (state) => {
                state.isLoadingFlights = true;
                state.error = null;
            })
            .addCase(getFlightsService.fulfilled, (state, action) => {
                state.isLoadingFlights = false;
                // state.flights = action.payload.flights;
                state.flights = action.payload.DirectAirPort;
                state.IndirectAirPort = action.payload.IndirectAirPort;
            })
            .addCase(getFlightsService.rejected, (state, action) => {
                state.isLoadingFlights = false;
                state.error = action.payload;
            })
            // ========================Passenger==================================

            .addCase(createListPassengerService.pending, (state) => {
                state.isLoadingCreatePassengers = true;
                state.error = null;
            })
            .addCase(createListPassengerService.fulfilled, (state, action) => {
                state.isLoadingCreatePassengers = false;
                // state.flights = action.payload.flights;
            })
            .addCase(createListPassengerService.rejected, (state, action) => {
                state.isLoadingCreatePassengers = false;
                state.error = action.payload;
            })
            // ========================Payment==================================
            .addCase(createPaymentService.pending, (state) => {
                state.isLoadingCreatePayment = true;
                state.error = null;
            })
            .addCase(createPaymentService.fulfilled, (state, action) => {
                state.isLoadingCreatePayment = false;
            })
            .addCase(createPaymentService.rejected, (state, action) => {
                state.isLoadingCreatePayment = false;
                state.error = action.payload;
            })
            // ========================SESSION INFO BY ID==================================
            .addCase(getBySessionIdService.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getBySessionIdService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.sessionInfo = action.payload;
            })
            .addCase(getBySessionIdService.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { setAirports, setSearchParams, setSelectedF, setSelectedPlan, setSelectedpassengers, setPos, setPnr,setFormikData } = flightSlice.actions;
export default flightSlice.reducer;
