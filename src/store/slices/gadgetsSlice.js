import { createSlice } from '@reduxjs/toolkit';
import { smartPhoneThunks } from '../thunks/smartPhoneThunks';

export const gatgetSlice = createSlice({
   name: 'gadget',
   initialState: {
      gadgets: null,
   },
   reducers: {},

   extraReducers: builder => {
      builder.addCase(smartPhoneThunks.fulfilled, (state, action) => {
         state.gadgets = action.payload;
      });
   },
});
