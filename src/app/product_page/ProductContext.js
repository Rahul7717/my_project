'use client'
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProductContext = () => useContext(ProductContext); 

export const ProductProvider = ({ children }) => {
  const [productQuantities, setProductQuantities] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get('https://admin.konkantreasures.com/apiPickv1/products/customer/get?shop_id=185&limit=30');
        if (response.data.status) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
  }
};
  fetchData();
}, []);
 
  const updateTotalPrice = (updatedQuantities) => {
    const newTotalPrice = Object.keys(updatedQuantities).reduce((total, id) => {  
      const product = data.find(item => item.id === parseInt(id));
      return total + (product?.sale_price || 0) * (updatedQuantities[id] || 0); 
    }, 0);
    
    setTotalPrice(newTotalPrice);
  };


  const handleQuantityChange = (id, newQuantity) => {
    setProductQuantities(prev => { const updatedQuantities = { ...prev, [id]: newQuantity };
      updateTotalPrice(updatedQuantities);
      return updatedQuantities;
    });
  };

  return (
    <ProductContext.Provider value={{ productQuantities, totalPrice, handleQuantityChange, data, setData }}>
      {children}
    </ProductContext.Provider>
);
};