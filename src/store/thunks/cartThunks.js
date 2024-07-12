import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const getBasketAmount = createAsyncThunk(
   'basket/getBasketAmount',
   async ({ ids }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('basket/order-amounts', {
            params: {
               ids: ids,
            },
         });
         return data;
      } catch (error) {
         rejectWithValue(error);
      }
   },
);

export const getOrderReview = createAsyncThunk(
   'paypal/getOrderReview',
   async ({ ids }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`paypal/order/${ids}`);
         return data;
      } catch (error) {
         rejectWithValue(error);
      }
   },
);
export const getOrder = createAsyncThunk(
   'paypal/getOrder',
   async ({ orderId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`paypal/${orderId}`);
         return data;
      } catch (error) {
         rejectWithValue(error);
      }
   },
);
