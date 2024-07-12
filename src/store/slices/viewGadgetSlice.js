import { createSlice } from '@reduxjs/toolkit';
import { viewGadgetThunks } from '../thunks/viewGadgetThunks';

export const viewGadgetSlice = createSlice({
   name: 'viewgadgets',
   initialState: {
      viewgadgets: [],
   },
   reducers: {},

   extraReducers: builder => {
      builder.addCase(viewGadgetThunks.fulfilled, (state, action) => {
         state.viewgadgets = action.payload;
      });
   },
});
