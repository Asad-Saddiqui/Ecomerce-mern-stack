import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Success() {
    const location = useLocation();

    useEffect(() => {
        // Function to parse query parameters from URL
        const getQueryParams = () => {
            const searchParams = new URLSearchParams(location.search);
            const params = {};
            for (const [key, value] of searchParams.entries()) {
                params[key] = value;
            }
            return params;
        };

        // Call the function and get the query parameters
        const queryParams = getQueryParams();

        // Now you can use the queryParams object to access individual parameters
        const paymentId = queryParams['paymentId'];
        const token = queryParams['token'];
        const payerId = queryParams['PayerID'];

        // Add additional query parameter to the fetch URL
        const queryString = new URLSearchParams({
            paymentId: paymentId,
            token: token,
            payerId: payerId,
            // Add more query parameters if needed
        }).toString();

        // Fetch data with the constructed URL
        fetch(`http://localhost:5000/success?${queryString}`, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + JSON.parse(localStorage.getItem('auth')).token
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle response data
                console.log('Response:', data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

        // Do whatever you need to do with the query parameters
        console.log('paymentId:', paymentId);
        console.log('token:', token);
        console.log('payerId:', payerId);

    }, [location.search]); // Run the effect whenever location.search changes

    return (
        <div>Success</div>
    );
}

export default Success;
