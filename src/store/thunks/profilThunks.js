// thunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const editProfileThunk = createAsyncThunk(
   'auth/editProfile',
   async (edit, { rejectWithValue, dispatch }) => {
      try {
         const response = await axiosInstance.post(
            'http://3.76.202.126/api/personal/edit-profile',
            edit,
         );
         localStorage.removeItem('auth');

         localStorage.setItem('auth', JSON.stringify(response.data));

         if (response.status !== 200) {
            return rejectWithValue(response.data);
         }

         dispatch(fetchProfile);

         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const fetchProfile = createAsyncThunk(
   'profile/fetchProfile',
   async (_, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(
            'http://3.76.202.126/api/personal/get-profile',
         );
         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);

export const newPasswordThunk = createAsyncThunk(
   'auth/newPassword',
   async (edit, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.patch(
            'http://3.76.202.126/api/personal/change-password',
            edit,
         );

         if (response.status !== 200) {
            return rejectWithValue(response.data);
         }

         return response.data;
      } catch (error) {
         return rejectWithValue(error.response?.data || error.message);
      }
   },
);
