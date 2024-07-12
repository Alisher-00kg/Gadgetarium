import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const orderinfoThunks = createAsyncThunk(
   'orderinfo',
   async ({ orderId }, { rejectWithValue }) => {
      try {
         const response = await axiosInstance.get(`personal/by-id/${orderId}`);
         console.log(response.data);
         return response.data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
