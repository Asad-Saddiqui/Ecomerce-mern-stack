export const AddtoCart = async (data) => {

    const user = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch('http://localhost:5000/api/user/cart', {
        method: 'POST',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data) // Ensure data is stringified
    });
    // Parse response JSON
    const responseData = await response.json();

    return responseData;

};
export const getCart = async () => {

    const user = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch('http://localhost:5000/api/user/cart', {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
    });
    // Parse response JSON
    const responseData = await response.json();

    return responseData;

};