import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const signUpThunks = createAsyncThunk(
   'auth/sign-up',
   async ({ userData, navigate, notify }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('auth/sign-up', userData);

         localStorage.setItem('auth', JSON.stringify(data));
         navigate('/');
         notify('Вы успешно зарегистрировались!');

         return data;
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            notify(error.response.data.message);
         } else {
            notify('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
         }
         return rejectWithValue(error.response.data.message);
      }
   },
);

export const signInPostThunks = createAsyncThunk(
   'auth/sign-in',
   async ({ userData, navigate, notify }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.post('auth/sign-in', userData);
         const { role, token } = response.data;
         localStorage.setItem('auth', JSON.stringify(response.data));

         navigate(role === 'ADMIN' ? '/admin' : '/');
         notify('Вход успешно выполнен!');

         return { token, role };
      } catch (error) {
         if (
            error.response &&
            error.response.data &&
            error.response.data.message
         ) {
            notify(error.response.data.message);
         } else {
            notify('Произошла ошибка. Пожалуйста, попробуйте еще раз.');
         }
         return rejectWithValue(error.response.data.message);
      }
   },
);
