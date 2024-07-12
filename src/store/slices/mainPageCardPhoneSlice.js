import { createSlice } from '@reduxjs/toolkit';
import {
   gadgetBasketThunk,
   gadgetComparisonThunk,
   gadgetFavoriteThunk,
   getFavoriteThunk,
} from '../thunks/mainPageCardPhoneThunks';

export const comparisonGadgetSlice = createSlice({
   name: 'comparison',
   initialState: {
      comparison: [],
   },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(gadgetComparisonThunk.fulfilled, (state, action) => {
         state.comparison = action.payload;
      });
   },
});

export const favoriteGadgetSlice = createSlice({
   name: 'favorite',
   initialState: {
      favorite: [],
   },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(gadgetFavoriteThunk.fulfilled, (state, action) => {
         state.favorite = action.payload;
      });
   },
});

export const basketGadgetSlice = createSlice({
   name: 'basket',
   initialState: {
      basket: [],
   },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(gadgetBasketThunk.fulfilled, (state, action) => {
         state.basket = action.payload;
      });
   },
});

export const favoritesPageSlice = createSlice({
   name: 'favorites',
   initialState: {
      favorites: [],
   },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(getFavoriteThunk.fulfilled, (state, action) => {
         state.favorites = action.payload;
      });
   },
});
