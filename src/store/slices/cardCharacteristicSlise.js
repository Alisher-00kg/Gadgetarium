import { createSlice } from '@reduxjs/toolkit';
import { getCardCharacteristics } from '../thunks/cardThunks';

export const cardCharacteristicSlice = createSlice({
   name: 'characteristics',
   initialState: {
      characteristics: {},
      loading: false,
      error: null,
   },

   extraReducers: builder => {
      builder
         .addCase(getCardCharacteristics.pending, state => {
            state.loading = true;
            state.error = null;
         })
         .addCase(getCardCharacteristics.fulfilled, (state, action) => {
            state.loading = false;
            state.description = action.payload;
         })
         .addCase(getCardCharacteristics.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
         });
   },
});
