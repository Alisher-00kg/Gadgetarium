import { createSlice } from '@reduxjs/toolkit';
import { getColor } from '../thunks/productThunk';

export const colorSlice = createSlice({
   name: 'color',
   initialState: {
      color: [],
   },
   extraReducers: builder => {
      builder.addCase(getColor.fulfilled, (state, action) => {
         state.color = action.payload;
      });
   },
});
