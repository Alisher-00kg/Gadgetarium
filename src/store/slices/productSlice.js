import { createSlice } from '@reduxjs/toolkit';
import {
   getGadgetById,
   getNewGadget,
   getProducts,
} from '../thunks/productsthunks';

export const productSlice = createSlice({
   name: 'productCategory',
   initialState: {
      selectedCategory: '',
      smartPhone: [],
      smartWatch: [],
      laptop: [],
      tablet: [],
      products: [],
      isLoading: true,
      productInfo: {},
   },
   reducers: {
      setSelectedCategory: (state, action) => {
         state.selectedCategory = action.payload;
      },
      smartPhoneCharacteristics(state, action) {
         state.smartPhone.push(action.payload);
      },
      smartWhatchCharacteristics(state, action) {
         state.smartWatch.push(action.payload);
      },
      laptopCharacteristics(state, action) {
         state.laptop.push(action.payload);
      },
      tabletCharacteristics(state, action) {
         state.tablet.push(action.payload);
      },

      addProduct(state, action) {
         state.products = action.payload;
      },
   },
   extraReducers: builder => {
      builder
         .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload;
            state.isLoading = false;
         })
         .addCase(getProducts.pending, (state, action) => {
            state.isLoading = true;
         })
         .addCase(getProducts.rejected, (state, action) => {
            state.isLoading = false;
         })
         .addCase(getGadgetById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productInfo = action.payload;
         })
         .addCase(getGadgetById.pending, state => {
            state.isLoading = true;
         })
         .addCase(getGadgetById.rejected, state => {
            state.isLoading = false;
            state.productInfo = [];
         });
      builder.addCase(getNewGadget.fulfilled, (state, { payload }) => {
         state.products = payload;
      });
   },
});
export const {
   setSelectedCategory,
   smartPhoneCharacteristics,
   smartWhatchCharacteristics,
   laptopCharacteristics,
   tabletCharacteristics,
   addProduct,
} = productSlice.actions;
