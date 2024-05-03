let token = JSON.parse(localStorage.getItem('auth'))
const login = async (credentials) => {
    let response = await fetch('http://localhost:5000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });

    response = await response.json();
    return response; // Return response data upon successful login
};
const profile = async () => {
    let response = await fetch('http://localhost:5000/api/user/profile_', {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${token.token}`,
            'Content-Type': 'application/json'
        },
    });
    console.log({ response })
    response = await response.json();
    return response; // Return response data upon successful login
};
const usercartGet = async () => {
    let response = await fetch('http://localhost:5000/api/user/cart', {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${token.token}`,
            'Content-Type': 'application/json'
        },
    });
    response = await response.json();
    return response; // Return response data upon successful login
};
const signup = async (credentials) => {
    let response = await fetch('http://localhost:5000/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    });
    response = await response.json();
    return response;
};

const authService = { login, profile, usercartGet, signup }
export default authService;
