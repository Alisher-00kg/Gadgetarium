import { createSlice } from '@reduxjs/toolkit';
import { getCardReviews } from '../thunks/cardThunks';

export const cardReviewsSlice = createSlice({
   name: 'review',
   initialState: {
      review: [],
   },
   extraReducers: builder => {
      builder.addCase(getCardReviews.fulfilled, (state, action) => {
         state.review = action.payload;
      });
   },
});
