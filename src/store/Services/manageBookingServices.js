import apiClient from '@/lib/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
const sliceName = 'manageBooking'

// ===================================== SEARCH FLIGHTS ==============================================
export const searchBookService = createAsyncThunk(
    `${sliceName}/searchBookService`,
    async (data, thunkAPI) => {
        try {

            const response = await apiClient.post(`/api/managebooking/InquirePNR/GetMainInfo?language=en`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== PRINT PDF ==============================================
export const printBookService = createAsyncThunk(
    `${sliceName}/printBookService`,
    async (data, thunkAPI) => {
        try {

            const response = await apiClient.post(`/api/booking/ManageBooking/Print/Print?language=en`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== GET RULES ==============================================
export const getRefundRulesService = createAsyncThunk(
    `${sliceName}/getRefundRulesService`,
    async (_, thunkAPI) => {
        try {

            const response = await apiClient.get(`/api/managebooking/CancelAndRefundRule`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== EDIT CONTACT ==============================================
export const editContactService = createAsyncThunk(
    `${sliceName}/editContactService`,
    async (data, thunkAPI) => {
        try {

            const response = await apiClient.post(`/api/managebooking/EditContactInfo/EditContactInfo`, data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);
// ===================================== VERIFY CARD ==============================================
export const verifyCardService = createAsyncThunk(
    `${sliceName}/verifyCardService`,
    async (data, thunkAPI) => {
        try {

            const response = await apiClient.post(`/api/managebooking/VerifyCard/VerifyCard`, data)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);