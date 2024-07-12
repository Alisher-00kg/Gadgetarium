import { createSlice } from '@reduxjs/toolkit';
import { getViewedProducts } from '../thunks/cardThunks';

export const viewedProductsSlice = createSlice({
   name: 'viewedProducts',
   initialState: {
      viewedProducts: [],
   },
   extraReducers: builder => {
      builder.addCase(getViewedProducts.fulfilled, (state, action) => {
         state.viewedProducts = action.payload;
      });
   },
});
