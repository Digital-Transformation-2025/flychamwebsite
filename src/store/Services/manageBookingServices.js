import apiClient from '@/lib/apiClient';
import { createAsyncThunk } from '@reduxjs/toolkit';
const sliceName = 'manageBooking'

// ===================================== SEARCH FLIGHTS ==============================================
export const searchBookService = createAsyncThunk(
    `${sliceName}/searchBookService`,
    async (data, thunkAPI) => {
        try {

            const response = await apiClient.post(`/api/booking/InquirePNR/ManageBooking/?filters=language==en`, data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message || 'Something went wrong'
            );
        }
    }
);