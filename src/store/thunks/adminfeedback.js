import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const adminFeedbackThunks = createAsyncThunk(
   'adminFeedback',
   async ({ feedbackType }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `feedback?feedbackType=${feedbackType}`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const adminFeedbackReplayThunks = createAsyncThunk(
   'adminFeedbackReplay',
   async ({ id, responseAdmin }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(`feedback/reply/${id}`, {
            responseAdmin,
         });
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const adminFeedbackDeleteThunks = createAsyncThunk(
   'adminFeedbackDelete',
   async ({ id }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`feedback/${id}`);
         dispatch(adminFeedbackThunks);
         return id;
      } catch (error) {
         return rejectWithValue(error.response.data);
      }
   },
);

export const editFeedback = createAsyncThunk(
   'feedback/edit',
   async ({ id, responseAdmin }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch(`feedback/${id}`, {
            responseAdmin,
         });
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
