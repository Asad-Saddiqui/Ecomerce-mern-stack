// ./services/authService.js

export const login = async (credentials) => {
    try {
        console.log({ credentials })
        let response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        // console.log({ response })
        response = await response.json();
        if (response.status === 'fail') {
            throw new Error(response.message);
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};
export const signup = async (credentials) => {
    try {
        console.log({ credentials })
        let response = await fetch('http://localhost:5000/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        });
        response = await response.json();
        console.log({ signupresponse: response })

        if (response.status === 'fail') {
            throw new Error(response.message);
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};
