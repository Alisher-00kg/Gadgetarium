import { createSlice } from '@reduxjs/toolkit';
import { getBrand } from '../thunks/productThunk';

export const brandSlice = createSlice({
   name: 'brand',
   initialState: {
      brand: [],
   },
   extraReducers: builder => {
      builder.addCase(getBrand.fulfilled, (state, action) => {
         state.brand = action.payload;
      });
   },
});
