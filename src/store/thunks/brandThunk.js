import { createAsyncThunk } from '@reduxjs/toolkit';
import { fileInstance } from '../../api/fileInstance';

export const postFile = createAsyncThunk(
   'file,postFile',
   async ({ formData, brandName }, { rejectWithValue }) => {
      try {
         const { data } = await fileInstance.post(
            `brand?brandName=${brandName}`,
            formData,
            {
               headers: {
                  'Content-Type': 'multipart/form-data',
               },
            },
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
