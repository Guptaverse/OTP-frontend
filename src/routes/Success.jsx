import React from 'react'
import {  Result,Card } from 'antd';
import "./success.css"
const Success = () => {
  return (
    <Card>

      <Result
      status="success"
      title="Successfully Verified "
      subTitle="Welcome to AdmitKard,lets find your favourite University!"
  
    />
    </Card>
  )
}

export default Success