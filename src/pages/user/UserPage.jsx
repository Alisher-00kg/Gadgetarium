import { Outlet } from 'react-router-dom';
import { Header } from '../../layout/Header';

export const UserPage = () => {
   return (
      <div>
         <Header />
         <Outlet />
      </div>
   );
};
