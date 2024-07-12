import { createAsyncThunk } from '@reduxjs/toolkit';
import { fileInstance } from '../../api/fileInstance';
import { axiosInstance } from '../../api/axiosInstance';

export const postFile = createAsyncThunk(
   'banner/postFile',
   async (formData, { rejectWithValue }) => {
      try {
         const { data } = await fileInstance.post('s3', formData);

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const getBanners = createAsyncThunk(
   'banner/get',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('banner');
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const postBanner = createAsyncThunk(
   'banner/post',
   async (data, { rejectWithValue }) => {
      try {
         await axiosInstance.post('banner', data);
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
