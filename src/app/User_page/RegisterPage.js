'use client'
import { register } from './UserSlice';
import './Register.css';
import ReactFlagsSelect from 'react-flags-select';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


const RegisterPage = ({ onBack, contactNo }) =>   {

  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [localContactNo, setLocalContactNo] = useState(contactNo || '');

  useEffect(() => {
    if (contactNo) {
      setLocalContactNo(contactNo);      
    }
  }, [contactNo]);

  useEffect(() => {
    if (selected) {
      setCountryCode(`+${selected}`);
    }
  }, [selected]);

    const register_data = () => {
    window.location.reload();
  }


  const handleRegister = async () => {
    if (!name || !email || !localContactNo || !countryCode) {
      setErrorMessage('Please fill all the fields');
      return;  
    }
 
    if (!email.endsWith('@gmail.com')) {
      setErrorMessage('Enter a valid Email Address');
      return;
     }

   try {
       dispatch(register({
        name, 
        email,
        contactNo: localContactNo,
        countryCode    
      }));
    
      register_data(); 

  } catch (error) {
        setErrorMessage('Registration failed. Please try again',error);
    }
  };
  
  return (
    <>
      <div className='register_page'>
        <h3 className='register_page_title'>Create your account</h3>
        <div className='register_form'>
          <div className='register_details'>
            <label htmlFor="name" className='label_name'>Name</label>
           <br />
            <input 
              type="text" 
              className='input_bar' 
              id='label_names'
              value={name}
              onChange={(e) => setName(e.target.value)} 
            />
           
            <br /> <br />
           
            <label htmlFor="email" className='label_name'>Email</label>
           <br />
            <input 
              type='email' 
              required 
              className='input_bar' 
              id='label_names' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <br /> <br />

            <label htmlFor="contactNo" className='label_name'>Select Country </label>
           
            <br />

            <div className='register_flag'>
              <ReactFlagsSelect
                searchable
                selected={selected}
                onSelect={(code) => setSelected(code)} 
                placeholder='Select Country' 
              />
            </div>
            
            <label htmlFor="contactNo" className='label_name'>Contact Number</label>
            
            <input 
              type='text' 
              className='input_bar' 
              id='label_names' 
              value={localContactNo}
            />
            
            {errorMessage && <div className='error'>{errorMessage}</div>}
            
            <div className='register_btns'>
              <button type='button' onClick={handleRegister} id='register1' className='register_btn'>Register</button>
              <button type='button' onClick={onBack} id='register2' className='register_btn'>Back</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;