// UnauthorizedPage.jsx
import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetState } from '../Api/profile/profileSlice';

const NotFound = () => {
    const navigate = useNavigate();
 const dispatch=useDispatch();
    const handleTrytologin = async () => {
        localStorage.clear();
        dispatch(resetState())
        navigate('/login');

        // try {
        //     let res = await fetch('http://localhost:5000/api/user/refresh', {
        //         method: "GET",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "refreshToken": JSON.parse(localStorage.getItem('refreshToken'))
        //         },
        //     });

        //     if (res.ok) {
        //         let user = await res.json();
        //         localStorage.setItem("user", JSON.stringify(user));
        //         localStorage.setItem("refreshToken", JSON.stringify(user.refreshToken));
        //         navigate('/admin')
        //     } else {
        //         console.error("Failed to refresh token:", res.statusText);
        //         // Handle failed response (e.g., show error message, redirect to login, etc.)
        //     }
        // } catch (error) {
        //     console.error("Error trying to login again:", error);
        // }
    }

    return (
        <Result
            status="403"
            title="403"
            subTitle="Sorry, you are not authorized to access this page."
            extra={<Button type="primary" onClick={handleTrytologin}>Try To Login Again</Button>}
        />
    );
};

export default NotFound;
