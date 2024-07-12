import { createSlice } from '@reduxjs/toolkit';
import {
   adminFeedbackDeleteThunks,
   adminFeedbackReplayThunks,
   adminFeedbackThunks,
} from '../thunks/adminfeedback';

export const feedbackadminSlice = createSlice({
   name: 'feedback',
   initialState: {
      feedback: {
         feedbackResponseList: [],
         totalRatings: 0,
      },
   },
   reducers: {},
   extraReducers: builder => {
      builder.addCase(adminFeedbackThunks.fulfilled, (state, action) => {
         state.feedback = action.payload;
      });
      builder.addCase(adminFeedbackReplayThunks.fulfilled, (state, action) => {
         const index = state.feedback.feedbackResponseList.findIndex(
            review => review.id === action.payload.id,
         );
         if (index !== -1) {
            state.feedback.feedbackResponseList[index] = action.payload;
         }
      });
      builder.addCase(adminFeedbackDeleteThunks.fulfilled, (state, action) => {
         state.feedback.feedbackResponseList =
            state.feedback.feedbackResponseList.filter(
               review => review.id !== action.payload,
            );
      });
   },
});
