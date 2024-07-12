import { createSlice } from '@reduxjs/toolkit';
import { getStatistics } from '../thunks/cardThunks';

export const statisticsSlice = createSlice({
   name: 'statistics',
   initialState: {
      statistics: {},
      isLoading: false,
   },
   extraReducers: builder => {
      builder
         .addCase(getStatistics.fulfilled, (state, action) => {
            state.statistics = action.payload;
            state.isLoading = false;
         })
         .addCase(getStatistics.pending, state => {
            state.isLoading = true;
         })
         .addCase(getStatistics.rejected, state => {
            state.isLoading = true;
         });
   },
});
