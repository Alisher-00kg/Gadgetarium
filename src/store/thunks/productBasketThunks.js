import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const getProductsBasket = createAsyncThunk(
   'basket,getProductsBasket',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('/basket');
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const deleteProductBasket = createAsyncThunk(
   'basket,deleteProductBasket',
   async (gadgetId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.delete(`basket/${gadgetId}`);
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const deleteAllGadgets = createAsyncThunk(
   'basket,deleteAllGadgets',
   async ({ ids }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.delete('basket/delete-all', {
            params: {
               ids: ids.join(','),
            },
         });
         dispatch(getProductsBasket());

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const postBasketFavoriteId = createAsyncThunk(
   'gadget,postBasketFavoriteId',
   async (gadgetIds, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.post('favorites/add-all', null, {
            params: {
               gadgetIds,
            },
         });
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const postBasketFavorite = createAsyncThunk(
   'gadget/postBasketFavorite',
   async (gadgetIds, { rejectWithValue }) => {
      try {
         const params = new URLSearchParams();
         gadgetIds.forEach(id => params.append('gadgetIds', id));

         const { data } = await axiosInstance.post('favorites/add-all', null, {
            params,
         });
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getOrderAmounts = createAsyncThunk(
   'basket,getOrderAmounts',
   async ({ ids }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`/basket/order-amounts`, {
            params: { ids: ids.join(',') },
         });

         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const patchBasket = createAsyncThunk(
   'gadget/patchBasket',
   async ({ subGadgetId, quantity }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.patch(
            `basket/${subGadgetId}`,
            null,
            {
               params: { quantity },
            },
         );
         dispatch(getProductsBasket());
         return data;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   },
);
