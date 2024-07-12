import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const gadgetDiscountsThunks = createAsyncThunk(
   'discount/gadgetDiscountThunks',
   async (pageSize, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget/discounts', {
            params: {
               size: pageSize,
            },
         });
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const newGadgetThunks = createAsyncThunk(
   'newgadget/newGadgetThunks',
   async (pageSize, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget/new', {
            params: {
               size: pageSize,
            },
         });
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const recommendedGadgetthunks = createAsyncThunk(
   'recommended/recommendedGadgetThunks',
   async (pageSize, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget/recommend', {
            params: {
               size: pageSize,
            },
         });
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
