import { createSlice } from '@reduxjs/toolkit';
import { getCardDescription } from '../thunks/cardThunks';

export const cardDescriptionSlise = createSlice({
   name: 'description',
   initialState: {
      description: {},
   },
   extraReducers: builder => {
      builder.addCase(getCardDescription.fulfilled, (state, action) => {
         state.description = action.payload;
      });
   },
});
