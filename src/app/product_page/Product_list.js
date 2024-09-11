'use client'
import React, { useState, useEffect , useRef } from 'react';
import { useRouter } from 'next/navigation';
import { ProductProvider, useProductContext } from '../product_page/ProductContext';
import '../product_page/Product_list.css';

const Product_list = () => {
  const { data } = useProductContext();
  const router = useRouter();
  const [totalPrice, setTotalPrice] = useState(0);
  const [visibleItems, setVisibleItems] = useState(5);

  useEffect(() => {

    let total = 0;
    
    data.forEach(item => {
      const quantity = parseInt(localStorage.getItem(`quantity-${item.id}`), 10) || 0;    
      total += item.sale_price * quantity;
    });
    setTotalPrice(total);
  }, [data]);

  useEffect(() => {

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 5);
      }
    };   

    window.addEventListener('scroll', handleScroll);

  return () => {
    window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  function handleClick(id) {    
    router.push(`/router?id=${encodeURIComponent(id)}`);
  }

  return (

    <>
    <div className="product_page"> 
      
      <div className="product_list">
        <div className="product_cards">
          
          {data.slice(0, visibleItems).map(item => (
            
            <div
              className='product_images' 
              onClick={() => handleClick(item.id)}
              key={item.id}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.image.original} className='img' alt="Product" height={100} width={100} />

              <br />

              <div className='product_price'> ₹ {item.sale_price}
                <div className='cutout_price'> ₹ {item.price} </div>
              </div> 

              <br /> <br /> <br />
              <div className='product_name'>{item.name}</div>
              <br /> <br />

              <div className='product_kg'> {item.quantity}kg </div>

              <br />
            
            </div>

          ))}
            
        </div>
      </div>
      <div className="total-cart-price">
    <h3 className='price_tag'> Total Price: ₹ {totalPrice}</h3>
      </div>
    </div>

    </>
  );
}

const Product_list_withProvider = () => (
  <ProductProvider>
    <Product_list />
  </ProductProvider>
);

export default Product_list_withProvider;
