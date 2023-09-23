import { useState ,useEffect} from "react";
import { Card,notification } from "antd";
import { InputOTP } from "antd-input-otp"; 
import { useLocation ,useNavigate} from 'react-router-dom';
import "./verify.css"
import img from "../assets/img1.png"
import axios from 'axios';

const Verify= () => {
  const [value, setValue] = useState([]); 
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();
  const { state } = useLocation();
  const [api, contextHolder] = notification.useNotification();


  useEffect(() => {
    if (flag) {
      handleNotification({
        placement: 'top',
        description: 'Verified!',
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
  const handleFinish = () => {
    const otp = value.join('');
    // console.log(`${process.env.REACT_APP_Backend_API_URL}/otp/verify`," ",otp," ",state)
    if(!otp || otp.length<6 || otp.includes(undefined) || isNaN(otp)){
      return handleNotification({
        placement: 'top',
        description: 'Enter a Valid OTP',
      });
    }
    axios
      .post(`${process.env.REACT_APP_Backend_API_URL}/otp/verify`, { enteredOTP:otp,number:state })
      .then((res) => {
        if (res.data.valid) { 
          setFlag(true)
          setTimeout(() => {
            navigate('/success'); 
          }, 3000);
        }
        else{
          
          return handleNotification({
            placement: 'top',
            description: 'OTP is Incorrect !',
          });
        }
      })
      .catch((err) => console.log('some error :', err));
  };

  return (
    <div>
      {contextHolder}
      <Card className="container-verify">

      <img src={img}/>
      <p>Please Verify Mobile Number</p>
      <p>An OTP has Sent to {state}</p>
      <InputOTP onChange={setValue} value={value} />
      <br/>
      <button className="verify-button" onClick={handleFinish}>Verify</button>
      <p>Recieve the code? <span style={{color:"#F7B348"}}>Resend</span></p>
      </Card>
    </div>
  );
};

export default Verify;