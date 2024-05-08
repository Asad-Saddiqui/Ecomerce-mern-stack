let token = JSON.parse(localStorage.getItem('auth'))

const profile = async () => {
    const user = JSON.parse(localStorage.getItem("auth"));

    let response = await fetch('http://localhost:5000/api/user/profile_', {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
    });
    console.log({ response })
    response = await response.json();
    return response; // Return response data upon successful login
};
const updateprofileUser = async (data) => {
    const user = JSON.parse(localStorage.getItem("auth"));
    let response = await fetch('http://localhost:5000/api/user/edit-user', {
        method: 'PUT',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    response = await response.json();
    return response; // Return response data upon successful login
};
const profile_ = { profile, updateprofileUser }
export default profile_;
