import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';
import { notify } from '../../components/main/SnackBar';
import {
   gadgetDiscountsThunks,
   newGadgetThunks,
   recommendedGadgetthunks,
} from './mainPageThunks';
import { comparisonFilterThunks } from './comparisionThunks';

export const gadgetComparisonThunk = createAsyncThunk(
   'gadget/comparison',

   async ({ subGadgetId, notify }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.patch(
            `comparison/${subGadgetId}`,
            {},
         );
         dispatch(gadgetDiscountsThunks());
         dispatch(newGadgetThunks());
         dispatch(recommendedGadgetthunks());
         notify(
            'Товар добавлен в список сравнения!',
            'Перейти в корзину',
            '/comparison',
         );
         dispatch(comparisonFilterThunks());
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const gadgetFavoriteThunk = createAsyncThunk(
   'gadget/favorites',
   async ({ subGadgetId, notify }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.patch(
            `favorites/${subGadgetId}`,
            {},
         );
         dispatch(gadgetDiscountsThunks());
         dispatch(newGadgetThunks());
         dispatch(recommendedGadgetthunks());

         notify(
            'Товар добавлен в избранное!',
            'Перейти в избранное',
            '/favorite',
         );

         dispatch(getFavoriteThunk());
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getFavoriteThunk = createAsyncThunk(
   'favorites/favorites',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('favorites');
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const deleteFavoriteAllThunk = createAsyncThunk(
   'favorites/favorites',
   async (_, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete('favorites/clear');
         dispatch(gadgetDiscountsThunks());
         dispatch(newGadgetThunks());
         dispatch(recommendedGadgetthunks());
         dispatch(getFavoriteThunk());
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const gadgetBasketThunk = createAsyncThunk(
   'gadget/basket',
   async ({ subGadgetId, notify }, { rejectWithValue, dispatch }) => {
      try {
         const { data } = await axiosInstance.patch(
            `basket/${subGadgetId}`,
            {},
         );

         dispatch(gadgetDiscountsThunks());
         dispatch(newGadgetThunks());
         dispatch(recommendedGadgetthunks());

         notify(
            'Товар успешно добавлен в корзину!',
            'Перейти в корзину',
            '/basket',
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
