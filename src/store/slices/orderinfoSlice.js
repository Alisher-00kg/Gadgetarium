import { createSlice } from '@reduxjs/toolkit';
import { orderinfoThunks } from '../thunks/orderinfoThunks';

export const orderinfoSlice = createSlice({
   name: 'orderinfo',
   initialState: {
      orderinfo: null,
   },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(orderinfoThunks.fulfilled, (state, action) => {
         state.orderinfo = action.payload;
      });
   },
});
