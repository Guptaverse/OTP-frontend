import React, { useState, useEffect } from 'react';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import axios from 'axios';
import { Card, Space, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import "./phone.css"
import logo from "../assets/AK_logo.png"


const Phone = () => {
  const [value, setValue] = useState('');
  const [flag, setFlag] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (flag) {
      handleNotification({
        placement: 'top',
        description: 'OTP has sent successfully to your phone',
      });
    }

  }, [flag]); 

  const handleNotification = ({ placement, description }) => {
    api.info({
      message: description,
      placement: placement,
    });
    setFlag(false);
  };
  const handleSubmit = () => {
    
    const validNum = value.substring(3, 13);

    if (validNum.length < 10 || isNaN(validNum)) {
      return handleNotification({
        placement: 'top',
        description: 'Enter a Valid Number',
      });
    }

    axios
      .post(`${process.env.REACT_APP_Backend_API_URL}/otp`, { number: value })
      .then((res) => {
        if (res.data.generatedOTP.length === 6) {
          setFlag(true); 
          setTimeout(() => {
            navigate('/verify',{ state: value }); 
          }, 3000);
        }
        console.warn('check your phone for OTP');
      })
      .catch((err) => console.log('some error :', err));

  };

  return (
    <>
    <Card className='container-phone'>
      <img id="logo" src ={logo}/>

      <h2>Welcome Back</h2>
      <p>Please sign in to your Account</p>
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}
        className='dialer'
      /><br/>
      {contextHolder}
      <button onClick={handleSubmit} className='phone-submit'>Submit</button>
    </Card>
      
    </>
  );
};

export default Phone;
