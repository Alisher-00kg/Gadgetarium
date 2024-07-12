import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const infograficThunks = createAsyncThunk(
   'order/infografic',
   async (period, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `order/info-amount?forPeriod=${period}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error?.message);
      }
   },
);

export const infoThunks = createAsyncThunk(
   'order/info',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('order/info');

         return data;
      } catch (error) {
         return rejectWithValue(error?.message);
      }
   },
);
