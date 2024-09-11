'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import OTPPage from './OTPPage';
import RegisterPage from './RegisterPage';
import './Loginpage.css';
import ReactFlagsSelect from 'react-flags-select';

const LoginPage = ({ onClose }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [countryCode, setCountryCode] = useState(''); 
  const [showOTPPage, setShowOTPPage] = useState(false);
  const [showRegisterPage, setShowRegisterPage] = useState(false);
  
  const loginRef = useRef(null); 
  
  useEffect(() => {
    if (selected) {
      setCountryCode(`+${selected}`);
    }
  }, [selected]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        onClose(); 
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleContactNoChange = (e) => {
    const input = e.target.value;
    if (/^\d*$/.test(input)) {
      setContactNo(input);
    }
  };

  const Handle_login = () => {
    if (!contactNo || contactNo.length < 10) {
      setErrorMessage('Fill your number properly');
      setShowOTPPage(false);
    } else {
      setShowOTPPage(true);
    }
  };

  return (
    <>
      <div ref={loginRef} className='login_page'>
        {showRegisterPage ? (
          <RegisterPage
            onRegisterSuccess={() => setShowRegisterPage(false)}
            onBack={() => setShowRegisterPage(false)}
            contactNo={contactNo}
          />
        ) : showOTPPage ? (
          <OTPPage
            contactNo={contactNo}
            countryCode={countryCode}
            onBack={() => setShowOTPPage(false)}
            onShowRegisterPage={() => setShowRegisterPage(true)}
          />
        ) : (
          <>
            <div className='login_title'>Login Page</div>
            <div className='login_details'>
              Login with your mobile number. We'll send you a code to the given mobile number to login into your account.
            </div>
            <div className='login_form'>
              <div className="flags">
                <ReactFlagsSelect
                searchable
                  selected={selected}
                  onSelect={(code) => setSelected(code)}
                  placeholder='Select Country'
                />
                <input
                  autoFocus='on'
                  type='text'
                  id='input_bar'
                  maxLength="10"
                  className='input_bar1'
                  value={contactNo}
                  placeholder='Enter your Contact Number'
                  onChange={handleContactNoChange}
                />
                <button onClick={Handle_login} id='input_bar_button' className='input_bar2'>Send OTP</button>
              </div>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
          </>
        )}
      </div>
    </>
  );
};

export default LoginPage;
