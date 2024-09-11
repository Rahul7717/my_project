'use client'

import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './User_page/UserSlice';
import RegisterPage from './User_page/RegisterPage';
import LoginPage from './User_page/LoginPage';
import OTPPage from './User_page/OTPPage';
import Product_list from './product_page/Product_list';
import './page.css';

const Page = () => {
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [displayLogin, setDisplayLogin] = useState(false);
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  const [showOTPPage, setShowOTPPage] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn, username } = useSelector((state) => state.user);

  useEffect(() => {
    setIsMounted(true); 
  }, []);

  const toggleLogin = () => {
    if (isLoggedIn) {
      dispatch(logout());
    } else {
      setDisplayLogin(!displayLogin);
    }
  };

  const handleLoginSuccess = (userName) => {
    dispatch(login({ contactNo: userName }));
    setShowOTPPage(false);
    setShowReghandle_popsisterPage(false);
    setDisplayLogin(false);
  };

  const handleLoginFail = () => {
    setShowRegisterPage(true);
    setDisplayLogin(false);
  };

  const handleBack = () => {
    setShowRegisterPage(false);
    setShowOTPPage(false);
    setDisplayLogin(true);
  };

  const handleLoginClose = () => {
    setDisplayLogin(false);
  };

  return (
    <>

      {isMounted && (
        <>
          {isLoggedIn ? (
            <h3 className="Display_username"> Hello, {username} </h3>
          ) : null}

          <button className="open_login" onClick={toggleLogin}>
            {isLoggedIn ? 'Logout' : 'Login'}
          </button>
                               
          {displayLogin && !isLoggedIn  (     
            <div className="login_page_container">
              <LoginPage onLoginSuccess={handleLoginSuccess} onLoginFail={handleLoginFail} onClose={handleLoginClose} />
            </div>
          )}

          {showRegisterPage && (
            <div className="register_page_container">
              <RegisterPage onBack={handleBack} only={handle_pops} />
            </div>
          )}

          {showOTPPage && (
            <div className="otp_page_container">
              <OTPPage onOTPVerify={handleLoginSuccess} onShowRegisterPage={setShowRegisterPage} onBack={handleBack} />
            </div>
          )}

          <div className="container">
            
            <div className="page_1">
              
              <img
                className="imagess"
                src="https://www.konkantreasures.com/_next/image?url=https%3A%2F%2Fkonkantreasuresbucket.s3.ap-south-1.amazonaws.com%2Fproduct%2Foriginal%2Fattachments-1717492490314-371747017.webp&w=1920&q=75"
                alt="img"
                height={180}
                width={180}
              />
            </div>

            <div className="page2">
              <div className="page3">
                <h2>Mangoes</h2>
                <div className="description_page">
                  <p className="paragraph" style={{ textAlign: 'justify' }}>
                    Mangoes are renowned for their exquisite taste, boasting a perfect balance of sweetness and tanginess
                    that tantalizes the taste buds. With a rich, creamy texture and a luscious golden-orange hue, they offer
                    a luxurious eating experience. Additionally, Kesar mangoes are celebrated...
                    {isExpanded && (
                      <>
                        for their heavenly aroma, which fills the air with tropical fragrances reminiscent of summer days.
                        Originating from the state of Gujarat in India, Kesar mangoes are prized for their exceptional
                        quality and are often referred to as the "Queen of Mangoes" for their unparalleled flavor and aroma.
                      </>
                    )}
                  </p>
                </div>
                <button className="read-btn" onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? 'Less' : 'Read More'}
                </button>
              </div>
            </div>
          </div>

          <Product_list />

        </>
      )}
    </>
  );
};

export default Page;

