import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const getBrand = createAsyncThunk(
   'brand/getBrand',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('brand');
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const getCategory = createAsyncThunk(
   'categories/getCategory',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget/categories');
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const getSubCategory = createAsyncThunk(
   'category/getSubCategory',
   async (categoryId, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            `gadget/${categoryId}/sub-categories`,
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
export const getColor = createAsyncThunk(
   'color/getColor',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(
            'products/colors?names=%23ffffff',
         );
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const addProduct = createAsyncThunk('product/addProduct', async () => {
   try {
      await axiosInstance.post('/gadget/{subCategoryId}/{brandId}');
   } catch (error) {
      console.error(error);
   }
});
