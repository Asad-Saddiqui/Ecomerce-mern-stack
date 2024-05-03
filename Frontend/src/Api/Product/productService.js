const getProducts = async () => {
    let response = await fetch('http://localhost:5000/api/product', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    response = await response.json();
    return response;
};

const getProductbyId_ = async (id) => {
    // console.log(id)
    let response = await fetch(`http://localhost:5000/api/product/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    response = await response.json();
    return response;
};

const products_ = { getProducts, getProductbyId_ };

export default products_;
