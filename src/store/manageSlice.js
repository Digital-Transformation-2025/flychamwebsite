// store/slices/flightSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { searchBookService } from './Services/manageBookingServices';

const manageSlice = createSlice({
    name: 'manage',
    initialState: {
        isLoading: false,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            // ========================GET AIR PORTS==================================
            .addCase(searchBookService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchBookService.fulfilled, (state, action) => {
                state.isLoading = false;
            })
            .addCase(searchBookService.rejected, (state, action) => {
                state.isLoading = false;
            })

    },
});

// export const { } = manageSlice.actions;
export default manageSlice.reducer;
