import React, { useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Top from '../../Components/Top/Top';
import Navbar from '../../Components/Navbar/Navbar';
// import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import "./login.css";
import image from '../../assets/1.png'
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../../store/actions/authActions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
const Signup = () => {
    const [Firstname, setFirstname] = useState('');
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isLoading, error, user } = useSelector(state => state.signup);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser({ Firstname, Email, password }));
        if (error) {
            toast.error(error);
        } else {
            setFirstname("")
            setEmail("")
            setPassword("")
            toast.success("Registration Successfully");
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
