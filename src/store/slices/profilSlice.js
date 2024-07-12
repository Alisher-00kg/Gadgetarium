import { createSlice } from '@reduxjs/toolkit';
import { fetchProfile, newPasswordThunk } from '../thunks/profilThunks';

export const profileSlice = createSlice({
   name: 'profile',
   initialState: {
      profile: {},
      error: null,
      status: 'idle',
      isLoading: false,
   },
   reducers: {},
   extraReducers: builder => {
      builder
         .addCase(newPasswordThunk.pending, state => {
            state.status = 'loading';
            state.error = null;
         })
         .addCase(newPasswordThunk.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.profile = action.payload;
         })
         .addCase(newPasswordThunk.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message;
         });
      builder
         .addCase(fetchProfile.pending, state => {
            state.status = 'loading';
            state.error = null;
            state.isLoading = true;
         })
         .addCase(fetchProfile.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.profile = action.payload;
            state.isLoading = false;
         })
         .addCase(fetchProfile.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || action.error.message;
            state.isLoading = false;
         });
   },
});
