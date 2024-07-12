import { createAsyncThunk } from '@reduxjs/toolkit';

import { axiosInstance } from '../../api/axiosInstance';

export const getProducts = createAsyncThunk(
   'gadget/getGadget',
   async ({ params }, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget', { params });
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const deleteProduct = createAsyncThunk(
   'gadget/delete',
   async ({ gadgetId, params, navigate }, { rejectWithValue, dispatch }) => {
      try {
         await axiosInstance.delete(`gadget/${gadgetId}`);
         dispatch(getProducts({ params }));
         if (navigate) {
            navigate('/');
         }
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const getGadgetById = createAsyncThunk(
   'gadget/getById',
   async (id, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get(`gadget/by-id/${id}`);
         return data;
      } catch (error) {
         return rejectWithValue(error.message);
      }
   },
);

export const postGadget = createAsyncThunk(
   'gadget/delete',
   async (
      { subCategoryId, brandId, newData, setTab },
      { rejectWithValue, dispatch },
   ) => {
      try {
         await axiosInstance.post(
            `gadget/${subCategoryId}/${brandId}`,
            newData,
         );
         dispatch(getNewGadget(setTab));
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const addPriceAndQuantity = createAsyncThunk(
   'gadget/addPriceAndQuantity',
   async (data, { rejectWithValue }) => {
      try {
         await axiosInstance.patch(
            `gadget/set-all-price?price=${data.price}&quantity=${data.quantity}&ids=${data.id}`,
         );
         data.setTab('3');
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);

export const addDescription = createAsyncThunk(
   'addDescription/post',
   async ({ productData, navigate }, { rejectWithValue }) => {
      try {
         await axiosInstance.patch('gadget/set-document/109', productData);

         navigate('/');
      } catch (e) {
         return rejectWithValue(e);
      }
   },
);

export const getNewGadget = createAsyncThunk(
   'gadget/get-new',
   async (setTab, { rejectWithValue }) => {
      try {
         const { data } = await axiosInstance.get('gadget/get-new');
         setTab('2');
         return data;
      } catch (error) {
         return rejectWithValue(error);
      }
   },
);
