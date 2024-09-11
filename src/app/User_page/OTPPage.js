'use client';
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './UserSlice';
import './otp.css';

const OTPPage = ({ contactNo, countryCode, onOTPVerify, onShowRegisterPage, onBack }) => {
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [error, setError] = useState('');
  const inputRefs = useRef([]);
  const dispatch = useDispatch();

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);
  
  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (!value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handleVerify = async () => {
    
    const otpString = otp.join('');
    const defaultOTP = '123456';

    if (otpString.length !== 6 || defaultOTP !== otpString) {
      setError('Please enter a 6-digit OTP');
      return;
    }

    if (otpString !== defaultOTP) {
      setError('Invalid OTP');
      return;
    }
       
    try {

      const response = dispatch(login({ contactNo, countryCode }));

      if (response.status === true) {
        onOTPVerify(response.data.name);
      } else {
        setError('Login failed, redirecting to Register page...');
        onShowRegisterPage(); 
      }
     
    } catch (error) {
      setError('Verification failed, please try again.');
      onShowRegisterPage();
    }
  };

  const handleResend = () => {
    setOtp(new Array(6).fill(''));
    setError('');
    inputRefs.current[0].focus();
  };

  return (
    <>

      <div className='otp-page'>
        <h3>OTP Page</h3>
        <div className='login_details'>Enter the OTP sent to your mobile number.</div> 
        <br />

        <div className='otp-inputs'>
          {otp.map((data, index) => (
            
            <input
              className='box'
              key={index}
              type='text'
              maxLength='1'
              value={data}
              onChange={e => handleChange(e.target, index)}
              ref={el => inputRefs.current[index] = el}
              autoFocus={index === 0}
            />

          ))}
        </div>

        {error && <p className='error'>{error}</p>}

        <div className='otp-actions'>
          <button className='otp_btn' id='first_btn' onClick={handleVerify}>Verify OTP</button>
          <button className='otp_btn' id='second_btn' onClick={onBack}>Back</button>
        </div>
      </div>
    </>
  );
};

export default OTPPage;
