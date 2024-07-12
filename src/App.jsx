import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { setUser } from './store/auth/authSlice';
import { AppRoutes } from './routes/AppRoutes';

const App = () => {
   const dispatch = useDispatch();

   useEffect(() => {
      const userData = localStorage.getItem('auth');
      const parsedData = JSON.parse(userData);
      if (parsedData) {
         dispatch(setUser(parsedData));
      }
   }, [dispatch]);

   return (
      <div>
         <AppRoutes />
      </div>
   );
};

export default App;
