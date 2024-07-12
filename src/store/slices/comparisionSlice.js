import { createSlice } from '@reduxjs/toolkit';
import {
   comparisonDeleteThunks,
   comparisonFilterThunks,
   comparisonTableThunks,
} from '../thunks/comparisionThunks';

export const comparisionfilterSlice = createSlice({
   name: 'comparisons',
   initialState: {
      comparisons: [],
      subGadgetResponses: {},
   },
   extraReducers: builder => {
      builder.addCase(comparisonFilterThunks.fulfilled, (state, action) => {
         state.comparisons = action.payload;
      });
      builder.addCase(comparisonTableThunks.fulfilled, (state, action) => {
         state.subGadgetResponses = action.payload;
      });
      builder.addCase(comparisonDeleteThunks.fulfilled, (state, action) => {
         state.loading = false;
         state.comparisons = state.comparisons.filter(
            comparisons => comparisons.id !== action.meta.arg,
         );
      });
   },
});
