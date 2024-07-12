import { createSlice } from '@reduxjs/toolkit';

export const personalDataSlice = createSlice({
   name: 'personalData',
   initialState: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      address: '',
   },
   reducers: {
      savePersonalData: (state, action) => {
         return { ...state, ...action.payload };
      },
   },
});

export const { savePersonalData } = personalDataSlice.actions;
