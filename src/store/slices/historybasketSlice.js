import { createSlice } from '@reduxjs/toolkit';

import { historyBasketThunks } from '../thunks/historyBasketThunks';

export const historySlice = createSlice({
   name: 'historybasket',
   initialState: {
      orders: null,
   },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(historyBasketThunks.fulfilled, (state, action) => {
         state.orders = action.payload;
      });
   },
});
