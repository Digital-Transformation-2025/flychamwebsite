// store/slices/flightSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { editContactService, getRefundRulesService, printBookService, searchBookService } from './Services/manageBookingServices';

const manageSlice = createSlice({
    name: 'manage',
    initialState: {
        isLoading: false,
        isLoadingPrint: false,
        bookInfo: {},
        pnrParams: { lastName: '', pnr: '' },
        isLoadingRules: false,
        rules: [],
        reasons: [],
        isLoadingEditContact: false,
    },
    reducers: {
        setPnrParams: (state, action) => {
            state.pnrParams = action.payload;
        },
        setBookInfo: (state, action) => {
            state.bookInfo = action.payload;
        },
        setRules: (state, action) => {
            state.rules = action.payload;
        },
        setReasons: (state, action) => {
            state.reasons = action.payload;
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
                state.bookInfo = action.payload.result.data
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
            // ======================== PRINT PDF ==================================
            .addCase(getRefundRulesService.pending, (state) => {
                state.isLoadingRules = true;
            })
            .addCase(getRefundRulesService.fulfilled, (state, action) => {
                state.isLoadingRules = false;
                state.rules = action.payload.items;
            })
            .addCase(getRefundRulesService.rejected, (state, action) => {
                state.isLoadingRules = false;
            })
            // ===================================== EDIT CONTACT ==============================================
            .addCase(editContactService.pending, (state) => {
                state.isLoadingEditContact = true;
            })
            .addCase(editContactService.fulfilled, (state, action) => {
                state.isLoadingEditContact = false;
            })
            .addCase(editContactService.rejected, (state, action) => {
                state.isLoadingEditContact = false;
            })

    },
});

export const { setPnrParams, setBookInfo, setRules, setReasons } = manageSlice.actions;
export default manageSlice.reducer;
