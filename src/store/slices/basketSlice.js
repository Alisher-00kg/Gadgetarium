import { createSlice } from '@reduxjs/toolkit';
import {
   deleteAllGadgets,
   deleteProductBasket,
   getOrderAmounts,
   getProductsBasket,
} from '../thunks/productBasketThunks';

export const basketSlice = createSlice({
   name: 'basketProducts',
   initialState: {
      products: [],
      orderAmounts: {},
      gadgetQuantities: {},
   },
   extraReducers: builder => {
      builder
         .addCase(getProductsBasket.fulfilled, (state, action) => {
            state.products = action.payload;
         })
         .addCase(deleteProductBasket.fulfilled, (state, action) => {
            state.products = state.products.filter(
               product => product.id !== action.meta.arg,
            );
         })

         .addCase(getOrderAmounts.fulfilled, (state, action) => {
            state.orderAmounts = action.payload.basketAmounts;
            state.gadgetQuantities = action.payload.gadgetResponse.reduce(
               (acc, gadget) => {
                  acc[gadget.id] = gadget.quantity;
                  return acc;
               },
               {},
            );
         })
         .addCase(deleteAllGadgets.fulfilled, (state, action) => {
            const idsToDelete = action.payload;
            state.products = state.products.filter(
               product => !idsToDelete.includes(product.id),
            );
         });
   },
});
