import {
   Navigate,
   RouterProvider,
   createBrowserRouter,
} from 'react-router-dom';
import { UserPage } from '../pages/user/UserPage';
import { AdminPage } from '../pages/admin/AdminPage';
import { MainPage } from '../pages/guest/MainPage';

import { PrivateRoutes } from './private/PrivateRoutes';
import { useSelector } from 'react-redux';
import { ProductCards } from '../components/main/productCards/ProductCards';
import { AboutDelivery } from '../pages/user/AboutDelivery';
import ProductsTable from '../components/admin/ProductsTable';
import { AddProduct } from '../components/admin/addProduct/firstPart/AddProduct';
import { FavoriteGadgetPage } from '../pages/FavoriteGadgetPage';
import MainLayout from '../layout/MainLayout';
import { AboutStore } from '../pages/user/AboutStore';
import SingleProduct from '../components/admin/SingleProduct';
import { Reviews } from '../components/ProductInfo/Reviews';
import { Description } from '../components/ProductInfo/Description';
import Characteristic from '../components/ProductInfo/Characteristic';
import CatalogFilter from '../pages/guest/CatalogFilter';
import { ProductTab } from '../components/admin/product/ProductTab';
import Profil from '../pages/user/Profil';

import ComparisionPage from '../pages/user/ComparisionPage';
import { FaqPage } from '../pages/user/FaqPage';

import AdminReviews from '../components/admin/AdminReviews';
import { Review } from '../components/admin/AdminReview';
import { Contacts } from '@mui/icons-material';

export const AppRoutes = () => {
   const { role } = useSelector(state => state.auth);

   const pathRole = {
      ADMIN: '/admin',
      USER: '/user',
      GUEST: '/',
   };

   const router = createBrowserRouter([
      {
         path: 'user',
         element: (
            <PrivateRoutes
               Component={<UserPage />}
               fallBackPath={'/admin'}
               isAllowed={role === 'USER'}
               role={pathRole[role]}
            />
         ),
         children: [
            {
               path: 'card',
               element: <ProductCards />,
            },
         ],
      },
      {
         path: '/',
         element: (
            <PrivateRoutes
               Component={<MainLayout />}
               fallBackPath={'/admin'}
               isAllowed={role === 'GUEST' || role === 'USER'}
               role={pathRole[role]}
            />
         ),
         children: [
            {
               path: '/',
               element: <MainPage />,
            },
            {
               path: 'delivery',
               element: <AboutDelivery />,
            },
            {
               path: 'about-store',
               element: <AboutStore />,
            },
            {
               path: 'favorite-product',
               element: <FavoriteGadgetPage />,
            },
            {
               path: 'product/:productId',
               element: <ProductCards />,
            },
            {
               path: 'catalog',
               element: <CatalogFilter />,
            },
            {
               path: 'faq',
               element: <FaqPage />,
            },
            {
               path: 'profil',
               element: <Profil />,
            },
            {
               path: 'comparision',
               element: <ComparisionPage />,
            },
            {
               path: 'contacts',
               element: <Contacts />,
            },
         ],
      },
      {
         path: 'admin',
         element: (
            <PrivateRoutes
               Component={<AdminPage />}
               fallBackPath={'/'}
               isAllowed={role === 'ADMIN'}
               role={pathRole[role]}
            />
         ),
         children: [
            {
               index: true,
               element: <Navigate to="/admin/goods" />,
            },
            {
               path: 'goods',
               element: <ProductsTable />,
            },
            {
               path: 'add-product',
               element: <ProductTab />,
            },
            {
               path: 'goods/:productId',
               element: <SingleProduct />,

               children: [
                  {
                     path: 'review',
                     element: <Reviews />,
                  },
                  {
                     path: 'description',
                     element: <Description />,
                  },
                  {
                     path: 'characteristic',
                     element: <Characteristic />,
                  },
               ],
            },
            {
               index: true,
               path: 'reviewsrating',
               element: <Review />,
            },
         ],
      },
      {
         path: 'order/:orderId',
         element: (
            <PrivateRoutes
               Component={<OrdersInfo />}
               fallBackPath={'/'}
               isAllowed={role === 'USER' || role === 'ADMIN'}
               role={pathRole[role]}
            />
         ),
      },
   ]);

   return <RouterProvider router={router} />;
};
