import { createSlice } from '@reduxjs/toolkit';
import { getBrand, getCategory, getSubCategory } from '../thunks/productThunk';

export const categorySlice = createSlice({
   name: 'category',
   initialState: {
      category: [],
      subCategory: [],
      brand: [],
   },
   extraReducers: builder => {
      builder
         .addCase(getCategory.fulfilled, (state, action) => {
            state.category = action.payload;
         })
         .addCase(getSubCategory.fulfilled, (state, action) => {
            state.subCategory = action.payload;
         })
         .addCase(getBrand.fulfilled, (state, action) => {
            state.brand = action.payload;
         });
   },
});
