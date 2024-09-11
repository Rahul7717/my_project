'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('user/login', async ({ contactNo, countryCode }) => {
  const response = await axios.post('https://admin.konkantreasures.com/apiPickv1/customer/login', {
    contact_no: contactNo,
    country_code: countryCode,
  });
  return response.data;
});

export const register = createAsyncThunk('user/register', async ({ name, email, contactNo, countryCode }) => {
  const response = await axios.post('https://admin.konkantreasures.com/apiPickv1/customer/register', {
    name,
    email,
    contact_no: contactNo,
    country_code: countryCode
  });
  return response.data;
});

const isBrowser = typeof window !== 'undefined';

const userSlice = createSlice({            
  name: 'user',  
  initialState: {
    isLoggedIn: isBrowser ? !!localStorage.getItem('username') : false,
    username: isBrowser ? localStorage.getItem('username') || null : null ,
  },

  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.username = null;
      if (isBrowser) {
        localStorage.removeItem('username');
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.username = action.payload.data.name;
        if (isBrowser) {
          localStorage.setItem('username', action.payload.data.name);
        }
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;