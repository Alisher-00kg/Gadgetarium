import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const viewGadgetThunks = createAsyncThunk(
   'viewGadget',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget/viewed-products');
         return data;
      } catch (error) {
         return rejectWithValue(error.massage);
      }
   },
);
