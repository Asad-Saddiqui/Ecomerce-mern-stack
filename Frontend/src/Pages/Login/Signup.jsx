import React, { useEffect, useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./login.css";
import image from '../../assets/1.png'
import { useDispatch, useSelector } from 'react-redux';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../../Api/auth/authSlice';
const Signup = () => {
    const [Firstname, setFirstname] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate()
    // const { userSIGNUP } = useSelector(state => state.auth);
    useEffect(() => {
        // let token = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")).token : null;
        // if (token) {
        //     navigate('/');
        // }
    }, [])
    const user_ = localStorage.getItem("auth") ? JSON.parse(localStorage.getItem("auth")) : null;
    let token = user_ ? user_.token : null;
    if (token) {
        navigate('/');
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let user = await dispatch(signupUser({ Firstname, Email, password }));
        if (user.error) {
            toast.error(user.payload);
        }
        if (!user.error && user.payload.status === 200) {
            console.log({ user })
            localStorage.setItem('otpToken', user.payload.otpToekn);
            navigate('/otp');
            setFirstname("")
            setEmail("")
            setPassword("")
            toast.success(user.payload.message);
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
                            <p class="hedding">Create an account</p>
                            <span>Enter your details below</span>
                            <div class="form_group">
                                <input type="text" placeholder='Name' value={Firstname} onChange={(e) => setFirstname(e.target.value)} />
                            </div>
                            <div class="form_group">
                                <input type="email" placeholder='Email' value={Email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div class="form_group">
                                <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div class="form_group">
                                <button class="login-btn" onClick={handleSubmit}>Create Account</button>
                            </div>
                            <div class="form_group">
                                <button class="login-btn-goole"> Signup with Google</button>
                            </div>
                            <p>Already have an account. &nbsp; &nbsp; <Link to="/login" class="link-btn" >Login</Link> </p>
                        </form>
                    </div>
                </div >

            </div >
            <Footer />
            <ToastContainer />
        </>
    );
};

export default Signup;
