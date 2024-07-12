import { createSlice } from '@reduxjs/toolkit';
import {
   getBasketAmount,
   getOrder,
   getOrderReview,
} from '../thunks/cartThunks';

export const cartSlice = createSlice({
   name: 'orderAmounts',
   initialState: {
      orderAmounts: {},
      gadgetResponse: [],
      order: {},
      paypalOrder: {},
   },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(getBasketAmount.fulfilled, (state, action) => {
            state.orderAmounts = action.payload.basketAmounts;
            state.gadgetResponse = action.payload.gadgetResponse;
         })
         .addCase(getOrderReview.fulfilled, (state, action) => {
            state.order = action.payload;
         })
         .addCase(getOrder.fulfilled, (state, action) => {
            state.paypalOrder = action.payload;
         });
   },
});
