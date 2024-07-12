import axios from 'axios';
import { store } from '../store/store';

export const fileInstance = axios.create({
   baseURL: 'http://3.76.202.126/api/',
   headers: { 'Content-Type': 'multipart/form-data' },
});

fileInstance.interceptors.request.use(
   config => {
      const configUpdate = { ...config };
      return configUpdate;
   },
   error => {
      return Promise.reject(error);
   },
);

fileInstance.interceptors.response.use(
   response => {
      return Promise.resolve(response);
   },
   error => {
      //   if (error?.code === 403) {
      //      store.dispatch(signOut());
      //      throw new Error('Unauthotized');
      //   }
      return Promise.reject(error);
   },
);
