import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const smartPhoneThunks = createAsyncThunk(
   'gadget',
   async (param, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `gadget/${param.catId}/filter`,
            {
               params: {
                  ...param,
               },
            },
         );
         return data;
      } catch (error) {
         return rejectWithValue(error.massage);
      }
   },
);

export const postBasketThunks = createAsyncThunk(
   'gadget/postBasket',
   async ({ subGadgetId, quantity }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(
            `basket/${subGadgetId}`,
            null,
            {
               params: { quantity },
            },
         );
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   },
);
export const postFavorites = createAsyncThunk(
   'gadget,postFavorite',
   async ({ gadgetIds }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.patch(`favorites/${gadgetIds}`);
         dispatch(smartPhoneThunks());
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const postComparison = createAsyncThunk(
   'gadget,postComparison',
   async ({ subGadgetId }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(
            `comparison/${subGadgetId}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
