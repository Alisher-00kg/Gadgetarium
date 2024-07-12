import { createSlice } from '@reduxjs/toolkit';
import {
   gadgetDiscountsThunks,
   newGadgetThunks,
   recommendedGadgetthunks,
} from '../thunks/mainPageThunks';

export const discountGadgetSlice = createSlice({
   name: 'discount',
   initialState: { discount: [], isLoading: false },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(gadgetDiscountsThunks.fulfilled, (state, action) => {
            state.discount = action.payload;
            state.isLoading = false;
         })
         .addCase(gadgetDiscountsThunks.pending, state => {
            state.isLoading = true;
         })
         .addCase(gadgetDiscountsThunks.rejected, state => {
            state.isLoading = false;
         });
   },
});

export const newGadgetSlice = createSlice({
   name: 'newgadget',
   initialState: { newgadget: [] },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(newGadgetThunks.fulfilled, (state, action) => {
         state.newgadget = action.payload;
      });
   },
});

export const recommendedGadgetSlice = createSlice({
   name: 'recommended',
   initialState: { recommended: [] },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(recommendedGadgetthunks.fulfilled, (state, action) => {
         state.recommended = action.payload;
      });
   },
});
