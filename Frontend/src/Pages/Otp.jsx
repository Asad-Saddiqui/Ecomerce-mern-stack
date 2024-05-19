// src/components/OtpVerify.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Typography, message } from 'antd';
// import '../../node_modules/antd/dist/antd.css';
import './OtpVerify.css';

const { Title, Text } = Typography;

const OtpVerify = () => {
    const [resend, setresend] = useState(false);
    const [otp, setotp] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        const opttoken = localStorage.getItem('otpToken');

        if (opttoken && otp) {
            try {
                const response = await fetch('http://localhost:5000/api/user/verify', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${opttoken}`,
                    },
                    body: JSON.stringify({ otp }),
                });

                const result = await response.json();

                if (response.ok) {
                    message.success('OTP verification successful!');
                    localStorage.clear();
                    delete result.status
                    localStorage.setItem('auth', JSON.stringify(result))
                    navigate('/')
                } else {
                    message.error(`Verification failed: ${result.message}`);
                }
            } catch (error) {
                message.error('An error occurred during verification.');
                console.error('Verification error:', error);
            }
        } else {
            message.error('Please enter the OTP.');
        }
    };
    const handleSubmitresend = async () => {
        // /resend/otp
        if (email.trim()) {
            try {
                const response = await fetch('http://localhost:5000/api/user/resend/otp', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                const result = await response.json();
                if (response.ok) {
                    localStorage.clear();
                    if (result.status === 201) {
                        message.warning(result.msg)
                    }
                    if (result.status === 200) {
                        localStorage.setItem('otpToken', result.otpToekn)
                        delete result.status;
                        message.success(result.message)
                        setresend(false)
                    }
                } else {
                    message.error(`Verification failed: ${result.message}`);
                }
            } catch (error) {
                message.error('An error occurred during Resend Code.');
                console.error('Verification error:', error);
            }
        } else {
            message.error('Please enter the Email.');
        }
    };
    const onChange = (text) => {
        setotp(text);
    };
    const sharedProps = {
        onChange,
    };

    return (
        <div className="otp-container">
            <div className="otp-image">
                <img src="https://img.freepik.com/premium-vector/mobile-otp-secure-verification-method-onetime-password-secure-transaction-woman-using-security-otp-one-time-password-verification-mobile-app-smartphone-screen-2step-verification_735449-280.jpg" alt="OTP Illustration" />
            </div>
            {!resend && <div className="otp-form-container">
                <Title level={3}>OTP Verification</Title>
                <Text>Enter OTP Code sent to ********@gmail.com . Expire after 5 mins</Text>

                <Form className="otp-form" onFinish={handleSubmit}>
                    <div className="otp-inputs">
                        <Input.OTP mask="🔒" {...sharedProps} />
                    </div>
                    <Text>
                        Didn’t receive OTP code? <a style={{ cursor: "pointer" }} onClick={() => setresend(!resend)}>Resend Code</a>
                    </Text>
                    <Form.Item>
                        <Button type="primary" className='antdbtn' htmlType="submit">
                            Verify & Proceed
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
            {resend && <div className="otp-form-container">
                <Title level={3}>Resend OTP Code</Title>
                <Text>Enter example@gmail.com</Text>

                <Form className="otp-form" onFinish={handleSubmitresend}>
                    <div className="otp-inputs">
                        <Input placeholder="Enter Your Email" value={email} onChange={(e) => setEmail(e.target.value)} className='email' />
                    </div>
                    <Text>

                    </Text>
                    <Form.Item>
                        <Button type="primary" className='antdbtn' htmlType="submit">
                            Resend Code
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
        </div>
    );
};

export default OtpVerify;
