import { FavoriteGadgetPage } from '../../pages/FavoriteGadgetPage';
import { AboutDelivery } from '../../pages/user/AboutDelivery';

export const UserRouter = () => {
   const userRouter = [
      {
         path: 'delivery',
         element: <AboutDelivery />,
      },
      {
         path: 'favorite',
         element: <FavoriteGadgetPage />,
      },
   ];
   return userRouter;
};
