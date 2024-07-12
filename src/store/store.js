import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth/authSlice';
import { cardDescriptionSlise } from './slices/cardDescriptionSlice';
import { cardCharacteristicSlice } from './slices/cardCharacteristicSlise';
import { cardReviewsSlice } from './slices/cardReviewsSlice';
import { viewedProductsSlice } from './slices/viewedProductsSlice';
import { statisticsSlice } from './slices/statisticsSlice';
import { productSlice } from './slices/productSlice';
import { categorySlice } from './slices/catergorySlice';
import { colorSlice } from './slices/colorSlice';
import { brandSlice } from './slices/brandSlice';
import { infograficslice } from './slices/infograficslice';
import { historySlice } from './slices/historybasketSlice';

import { orderinfoSlice } from './slices/orderinfoSlice';
import { gatgetSlice } from './slices/gadgetsSlice';
import { viewGadgetSlice } from './slices/viewGadgetSlice';
import {
   discountGadgetSlice,
   newGadgetSlice,
   recommendedGadgetSlice,
} from './slices/mainPageSlice';
import {
   basketGadgetSlice,
   comparisonGadgetSlice,
   favoriteGadgetSlice,
   favoritesPageSlice,
} from './slices/mainPageCardPhoneSlice';
import { cartSlice } from './slices/cartSlice';
import { personalDataSlice } from './slices/personalDataSlice';
import { feedbackadminSlice } from './slices/feedbackadminSlice';
import { bannerSlice } from './slices/bannerSlice';
import { basketSlice } from './slices/basketSlice';
import { profileSlice } from './slices/profilSlice';
import { comparisionfilterSlice } from './slices/comparisionSlice';

export const store = configureStore({
   reducer: {
      auth: authSlice.reducer,
      description: cardDescriptionSlise.reducer,
      characteristics: cardCharacteristicSlice.reducer,
      review: cardReviewsSlice.reducer,
      viewedProducts: viewedProductsSlice.reducer,
      statistics: statisticsSlice.reducer,
      productCategory: productSlice.reducer,
      category: categorySlice.reducer,
      color: colorSlice.reducer,
      brand: brandSlice.reducer,
      products: productSlice.reducer,
      infografic: infograficslice.reducer,
   },
});
