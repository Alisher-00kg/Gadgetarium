import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const historyBasketThunks = createAsyncThunk(
   'historybasket',
   async (_, { rejectWithValue }) => {
      try {
         const data = await axiosInstance.get('personal');
         return data;
      } catch (error) {
         return rejectWithValue(error.massage);
      }
   },
);
