import { Navigate } from 'react-router';

export const PrivateRoutes = ({ Component, fallBackPath, isAllowed }) => {
   // eslint-disable-next-line no-extra-boolean-cast
   if (isAllowed) {
      return Component;
   }
   return <Navigate to={fallBackPath} replace />;
};
