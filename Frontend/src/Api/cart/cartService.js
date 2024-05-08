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
export const AddtocartUpdate = async (data) => {

    const user = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch('http://localhost:5000/api/user/cart-update', {
        method: 'put',
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
    const responseData = await response.json();

    return responseData;

};
export const deletecart = async (id) => {

    const user = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch(`http://localhost:5000/api/user/cart/delete/${id}`, {
        method: 'delete',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
    });
    const responseData = await response.json();
    return responseData;

};