// import { createAsyncThunk } from '@reduxjs/toolkit';
// import { axiosInstance } from '../../api/axiosInstance';

// export const discountsPost = createAsyncThunk(
//    'discount',
//    async ({ selectedProducts, discount }, { rejectWithValue }) => {
//       try {
//          const subGadgetsId = selectedProducts.join(',');
//          const { data } = await axiosInstance.post('discount', discount, {
//             params: {
//                subGadgetsId: subGadgetsId,
//             },
//          });
//          return data;
//       } catch (error) {
//          if (error.response && error.response.data) {
//             return rejectWithValue(error.response.data);
//          }
//          return rejectWithValue(error.message);
//       }
//    },
// );
import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../api/axiosInstance';

export const discountsPost = createAsyncThunk(
   'discount',
   async ({ selectedProducts, discount }, { rejectWithValue }) => {
      try {
         const subGadgetsId = selectedProducts.join(',');
         const payload = {
            ...discount,
            discountSize: parseInt(discount.discountSize, 10),
         };
         const { data } = await axiosInstance.post('discount', payload, {
            params: {
               subGadgetsId: subGadgetsId,
            },
         });
         return data;
      } catch (error) {
         if (error.response && error.response.data) {
            return rejectWithValue(error.response.data);
         }
         return rejectWithValue(error.message);
      }
   },
);
