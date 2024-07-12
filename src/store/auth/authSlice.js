import { createSlice } from '@reduxjs/toolkit';
import { signInPostThunks, signUpThunks } from '../thunks/authThunks';
import { editProfileThunk } from '../thunks/profilThunks';

export const authSlice = createSlice({
   name: 'auth',
   initialState: {
      isAuth: false,
      role: 'GUEST',
      token: null,
      error: null,
      profile: {},
   },
   reducers: {
      setUser: (state, { payload }) => {
         state.isAuth = true;
         state.token = payload.token;
         state.role = payload.role;
      },
      logout: (state, { payload }) => {
         state.isAuth = false;
         state.token = null;
         state.role = 'GUEST';
         localStorage.removeItem('auth');
         payload('/');
      },
   },

   extraReducers: builder => {
      builder.addCase(signUpThunks.pending, state => {
         state.token = null;
      });
      builder.addCase(signUpThunks.fulfilled, (state, { payload }) => {
         state.token = payload.data.token;
         state.isAuth = true;
         state.role = payload.data.role;
      });
      builder
         .addCase(signUpThunks.rejected, (state, action) => {
            state.token = null;
            state.error = action.error.message;
         })
         .addCase(signInPostThunks.pending, state => {
            state.token = null;
         })
         .addCase(signInPostThunks.fulfilled, (state, { payload }) => {
            state.token = payload.token;

            state.isAuth = true;
            state.role = payload.role;
         })
         .addCase(signInPostThunks.rejected, (state, action) => {
            state.error = action.error.message;
         })
         .addCase(editProfileThunk.pending, state => {
            state.error = null;
         })
         .addCase(editProfileThunk.fulfilled, (state, action) => {
            state.token = action.payload.token;
            state.profile = action.payload;
         })
         .addCase(editProfileThunk.rejected, (state, action) => {
            state.error = action.payload || action.error.message;
         });
   },
});

export const { logout, setUser, setName } = authSlice.actions;
