import { createSlice } from '@reduxjs/toolkit';
import { infoThunks, infograficThunks } from '../thunks/infograficThunks';
const initialState = {
   infografic: {
      currentPeriod: null,
      previousPeriod: null,
   },
   info: {
      buyPrice: null,
      buyCount: 0,
      orderPrice: null,
      orderCount: 0,
   },
   status: 'idle',
   error: null,
};

export const infograficslice = createSlice({
   name: 'infografic',
   initialState,
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(infograficThunks.pending, state => {
            state.status = 'loading';
         })
         .addCase(infograficThunks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.infografic = action.payload;
         })
         .addCase(infograficThunks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
         });

      builder
         .addCase(infoThunks.pending, state => {
            state.status = 'loading';
         })
         .addCase(infoThunks.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.info = action.payload;
         })
         .addCase(infoThunks.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
         });
   },
});
