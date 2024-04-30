import React, { useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./login.css";
import image from '../../assets/1.png'
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
const Login = () => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  let navigate = useNavigate()
  const { isLoading, error, user } = useSelector(state => state.auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ Email, password }));
    if (error) {
      toast.error(error);
    }
    if (user) {
      toast.success("Login Successfully");
      console.log({ user });
      localStorage.setItem("auth", JSON.stringify(user))
      navigate('/');
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
