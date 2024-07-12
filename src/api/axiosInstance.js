import axios from 'axios';
import { store } from '../store/store';

export const axiosInstance = axios.create({
   baseURL: 'http://3.65.199.99/api/v1/',
   timeout: 8000,
   headers: { Accept: 'application/json' },
});

axiosInstance.interceptors.request.use(
   config => {
      const configUpdate = { ...config };
      const { token } = store.getState().auth;
      if (token) {
         configUpdate.headers.Authorization = `Bearer ${token}`;
      }

      return configUpdate;
   },
   error => {
      return Promise.reject(error);
   },
);

axiosInstance.interceptors.response.use(
   response => {
      return Promise.resolve(response);
   },
   error => {
      // if (error?.code === 403) {
      //    store.dispatch(signOut());
      //    throw new Error('Unauthotized');
      // }
      return Promise.reject(error);
   },
);
