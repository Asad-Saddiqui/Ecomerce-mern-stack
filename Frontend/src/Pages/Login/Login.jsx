import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
import "./login.css";
import image from '../../assets/1.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Api/auth/authSlice";
import { profileGet } from '../../Api/profile/profileSlice';

const Login = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate()
  // const state_ = authState.auth;
  const user_ = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;
  let token = user_ ? user_.token : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let userdata = await dispatch(loginUser({ Email, password }));
    console.log({ userdata })
    if (userdata) {
      localStorage.setItem('auth', JSON.stringify(userdata.payload))
      dispatch(profileGet());
      navigate("/");
    }

    if (userdata.error) {
      toast.error(userdata.payload);
    }

  };

  return (
    <>

      <Top />
      <Navbar />
      <div className="auth">

        <div class="login-section">
          <div class="loginImg">
            <img src={image} alt="no image" />
          </div>
          <div class="loginform">
            <form>
              <p class="hedding">Log in to Exclusive</p>
              <span>Enter your details below</span>
              <div class="form_group">
                <input type="email" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div class="form_group">
                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div class="form_group">
                <button class="login-btn-text" onClick={handleSubmit}>Login</button>
                <button class="login-Forgot">Forgot Password</button>
              </div>
              <p>Create account. &nbsp; &nbsp; <Link to="/signup" class="link-btn">Signup</Link> </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Login;
