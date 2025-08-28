// store/slices/flightSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { printBookService, searchBookService } from './Services/manageBookingServices';

const manageSlice = createSlice({
    name: 'manage',
    initialState: {
        isLoading: false,
        isLoadingPrint: false,
        bookInfo: {},
        pnrParams: { lastName: '', pnr: '' },
    },
    reducers: {
        setPnrParams: (state, action) => {
            state.pnrParams = action.payload;
        },
        setBookInfo: (state, action) => {
            state.bookInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // ========================GET AIR PORTS==================================
            .addCase(searchBookService.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(searchBookService.fulfilled, (state, action) => {
                state.isLoading = false;
                state.bookInfo = action.payload.data
            })
            .addCase(searchBookService.rejected, (state, action) => {
                state.isLoading = false;
            })
            // ======================== PRINT PDF ==================================
            .addCase(printBookService.pending, (state) => {
                state.isLoadingPrint = true;
            })
            .addCase(printBookService.fulfilled, (state, action) => {
                state.isLoadingPrint = false;
            })
            .addCase(printBookService.rejected, (state, action) => {
                state.isLoadingPrint = false;
            })

    },
});

export const { setPnrParams, setBookInfo } = manageSlice.actions;
export default manageSlice.reducer;
