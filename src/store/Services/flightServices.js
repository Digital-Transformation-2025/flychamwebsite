import apiClient from '@/lib/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

const sliceName = 'airPorts';
// ===================================== GET AIR PORTS ==============================================
export const getAirports = createAsyncThunk(
    `${sliceName}/getAirports`,
    async ({ search }, thunkAPI) => {
        try {
            const filters = `language==en;search@=${search || ''}`;
            const response = await apiClient.get(`/api/booking/AirPort`, {
                params: { filters },
            });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== SEARCH FLIGHTS ==============================================
export const getFlightsService = createAsyncThunk(
    `${sliceName}/getFlightsService`,
    async (data, thunkAPI) => {
        try {

            const response = await apiClient.post(`/api2/GetFlightsWithPrice/?filters=language==en`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== CREATE PASSENGER LISITS ==============================================

export const createListPassengerService = createAsyncThunk(
    `${sliceName}/createListPassengerService`,
    async (data, thunkAPI) => {
        try {

            // const response = await apiClient.post(`/api/bookingtest/Contact/CreateList`, data);
            const response = await apiClient.post(`/api/booking/Contact/CreateListPassenger`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
              error.response.data|| 'Something went wrong'
            );
        }
    }
);
// ===================================== CREATE PAYMENT ==============================================

export const createPaymentService = createAsyncThunk(
    `${sliceName}/createPaymentService`,
    async (data, thunkAPI) => {
        try {

            const response = await apiClient.post(`/api/booking/Payment/Checkout`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== CREATE SESSION BY ID ==============================================

export const getBySessionIdService = createAsyncThunk(
    `${sliceName}/getBySessionIdService`,
    async (id, thunkAPI) => {
        try {
            const response = await apiClient.get(
                `/api/booking/PaymentPNRResult/GetBySessionId`,
                {
                    headers: {
                        SessionId: id,
                    },
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== VALIDATE EMAIL ==============================================
export const validateEmailService = createAsyncThunk(
    `${sliceName}/validateEmailService`,
    async (email, thunkAPI) => {
        try {

            const response = await apiClient.get(`/api/AbstractValidation/EmailDetail/ValidateEmail?email=${email}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== VALIDATE PHONE NUMBER ==============================================
export const validatePhoneNumberService = createAsyncThunk(
    `${sliceName}/validatePhoneNumberService`,
    async (phoneNumber, thunkAPI) => {
        try {

            const response = await apiClient.get(`/api/AbstractValidation/PhoneDetail/ValidatePhone?phoneNumber=${phoneNumber}`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== DOWNLOAD TICKET ==============================================
export const downloadTickeyService = createAsyncThunk(
    `${sliceName}/downloadTickeyService`,
    async ({ SessionId, PNR }, thunkAPI) => {
        try {
            const response = await apiClient.get(
                `/api/booking/PDFTicket/DownloadTicketPDF`,
                {
                    headers: {
                        'SessionId': SessionId,
                        'PNR': PNR
                    }
                }
            );
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
