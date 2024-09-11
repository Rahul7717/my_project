'use client'
import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../User_page/UserSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
