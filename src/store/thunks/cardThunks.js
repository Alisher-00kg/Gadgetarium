import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';
import { getGadgetById } from './productsthunks';

export const getCardDescription = createAsyncThunk(
   'gadget,getCardDescription',
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`gadget/description/${id}`);
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const getCardCharacteristics = createAsyncThunk(
   'gadget,getCardCharacteristics',
   async ({ id }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `gadget/characteristics/${id}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const getCardReviews = createAsyncThunk(
   'gadget,getCardReviews',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`gadget/reviews/${id}`);
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getViewedProducts = createAsyncThunk(
   'gadget,getViewedProducts',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget/viewed-products');
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const postBasket = createAsyncThunk(
   'gadget/postBasket',
   async (
      { subGadgetId, quantity, gadgetId },
      { rejectWithValue, dispatch },
   ) => {
      try {
         const { data } = await axiosInstance.patch(
            `basket/${subGadgetId}`,
            null,
            {
               params: { quantity },
            },
         );
         dispatch(getGadgetById(gadgetId));
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   },
);
export const postFavorites = createAsyncThunk(
   'gadget,postFavorite',
   async ({ subGadgetId, gadgetId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.post('favorites/add-all', null, {
            params: {
               gadgetIds: subGadgetId,
            },
         });

         dispatch(getGadgetById(gadgetId));

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const deleteFavorite = createAsyncThunk(
   'gadget,postFavorite',
   async ({ subGadgetId, gadgetId }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete(
            `favorites/${subGadgetId}`,
         );

         dispatch(getGadgetById(gadgetId));

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const getStatistics = createAsyncThunk(
   'gadget,getStatistics',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`feedback/statistics/${id}`);
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const postFeedback = createAsyncThunk(
   'feedback,postFeedback',
   async ({ feedbackData }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post(
            `feedback/${3}`,
            feedbackData,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const postReview = createAsyncThunk(
   'review/postReview',
   async (
      { gadgetId, adminText, productId },
      { rejectWithValue, dispatch },
   ) => {
      try {
         await axiosInstance.patch(`feedback/reply/${gadgetId}`, {
            responseAdmin: adminText,
         });
         dispatch(getCardReviews(productId));
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const editFeedback = createAsyncThunk(
   'review/editReview',
   async (data, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.patch(`feedback/${data.id}`, {
            responseAdmin: data.responseAdmin,
         });
         dispatch(getCardReviews(data.productId));
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
