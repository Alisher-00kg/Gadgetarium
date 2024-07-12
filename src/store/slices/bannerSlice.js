import { createSlice } from '@reduxjs/toolkit';
import { getBanners, postFile } from '../thunks/bannersthunks';

export const bannerSlice = createSlice({
   name: 'banner',
   initialState: {
      images: [],
      imageLink: [],
      isLoading: false,
   },
   reducers: {},

   extraReducers: builder => {
      builder
         .addCase(getBanners.fulfilled, (state, { payload }) => {
            state.images = payload;
         })
         .addCase(postFile.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.imageLink.push(payload.data);
         })
         .addCase(postFile.pending, state => {
            state.isLoading = true;
         });
   },
});
