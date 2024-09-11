'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './page.css';
import Link from 'next/link';

const Page = () => {
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [id, setId] = useState(null);
 
  useEffect(() => {
    if (typeof window !== 'undefined') {

      const searchParams = new URLSearchParams(window.location.search);
      const idParam = searchParams.get('id');
      setId(idParam);
      const storedQuantity = localStorage.getItem(`quantity-${idParam}`);

      if (storedQuantity) {
        setQuantity(parseInt(storedQuantity, 10));
      }
      
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
    }
  }, []);

  useEffect(() => {
    const product = data.find(item => item.id == id);
    if (product) {
      setTotalPrice(quantity === 0 ? 0 : product.sale_price * quantity);
    }
  }, [data, id, quantity]);
 
  const handleIncrease = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1;
      localStorage.setItem(`quantity-${id}`, newQuantity); 
      updateTotalPrice(newQuantity);
      return newQuantity;
    });
  };

  const handleDecrease = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity > 1 ? prevQuantity - 1 : 0;
      localStorage.setItem(`quantity-${id}`, newQuantity);
      updateTotalPrice(newQuantity);
      return newQuantity;
    });
  };

  const updateTotalPrice = (newQuantity) => {
    const product = data.find(item => item.id == id);
    if (product) {
      setTotalPrice(newQuantity === 0 ? 0 : product.sale_price * newQuantity);
    }
  };

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);

  };

  return (
    <>
      {data.filter((item) => item.id == id).map((i) => (
        <div key={i.id}>
        
          <img className='images' src={i.image.original} alt='image' width={300} height={300} />
          <Link href='/' className='close-btn'>Close</Link>         
          
          <div className="modal-overlay">
            <div className="modal-content">
              <br />
              <div className="product-info-content">
                <h2 id="product_names">Your product name: {i.name}</h2>
                <div>Weight - {i.quantity}kg </div> 
                <br />
                <div>
                  {isExpanded ? i.description : (i.description ? `${i.description.slice(0, 100)}...` : '')}
                </div>
                <br />
                {i.description && i.description.length > 100 && (
                  <button className="read_btn" onClick={toggleReadMore}>
                    {isExpanded ? 'Less' : 'Read More...'}
                  </button>
                )}
                <br /><br />
                <div className="product_prices">
                  <strong className="price">Price: </strong>
                  ₹ {totalPrice}
                  <div className="cutoff_prices">₹ {i.price}</div>
                </div>
                <div className="quantity-controls">
                <button className='btn_decrement' onClick={handleDecrease}>-</button>
                  <span className="add_items1">{quantity}</span>
                <button className='btn_increment' onClick={handleIncrease}>+</button>
                </div> 
                <div className="list_of_items">
                  <h4>Categories</h4>
                </div>
                <div className="links">
                  sellers
                <div id="mangos">mangos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Page;
