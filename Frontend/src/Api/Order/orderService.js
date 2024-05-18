const getOrders = async () => {
    console.log("myorder is ")
    const user = JSON.parse(localStorage.getItem("auth"));
    let response = await fetch('http://localhost:5000/api/user/get-orders', {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
    });
    response = await response.json();
    console.log({ Orders: response })
    return response; // Return response data upon successful login
};

const Order_ = { getOrders }
export default Order_;
