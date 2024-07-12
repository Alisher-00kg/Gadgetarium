import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const comparisonFilterThunks = createAsyncThunk(
   'comparison',
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('comparison');
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
export const comparisonTableThunks = createAsyncThunk(
   'comparisontable',
   async ({ gadgetType = 'PHONE', isDifferences }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('comparison/compare', {
            params: {
               gadgetType,
               isDifferences,
            },
         });

         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
export const comparisonClearThunks = createAsyncThunk(
   'comparisonclear',
   async (
      { gadgetType = 'PHONE', isDifferences },
      { rejectWithValue, dispatch },
   ) => {
      try {
         const { data } = await axiosInstance.delete('comparison/clear');
         dispatch(comparisonTableThunks({ gadgetType, isDifferences }));
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
export const comparisonDeleteThunks = createAsyncThunk(
   'comparisondelete',
   async (
      { id, gadgetType = 'PHONE', isDifferences },
      { rejectWithValue, dispatch },
   ) => {
      try {
         const { data } = await axiosInstance.delete(`comparison/${id}`);
         dispatch(comparisonTableThunks({ gadgetType, isDifferences }));
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
export const addToCartThunks = createAsyncThunk(
   'basket/add',
   async ({ subGadgetId, quantity }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.patch('basket', null, {
            params: { subGadgetId, quantity },
         });
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);
