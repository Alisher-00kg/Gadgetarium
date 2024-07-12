import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../api/axiosInstance';

export const getAllGatget = createAsyncThunk(
   'gadget',
   async ({ params }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget', { params });
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
export const getAllOnSale = createAsyncThunk(
   'sale',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('sale');
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const getAllFavorites = createAsyncThunk(
   'favorites',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('favorites');
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
export const getAllBasket = createAsyncThunk(
   'basket',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('basket');
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
