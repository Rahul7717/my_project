'use client'
import React from 'react';
import { Provider } from 'react-redux';
import store from '../app/store/store'; 

const ProviderWrapper = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export default ProviderWrapper;
