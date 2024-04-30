export const getProducts = async () => {
    try {
        let response = await fetch('http://localhost:5000/api/product', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        console.log({ response })
        if (response.status === 'fail') {
            throw new Error(response.message);
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};
export const getProductbyId_ = async (id) => {
    try {
        let response = await fetch(`http://localhost:5000/api/product/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        if (response.status === 'fail') {
            throw new Error(response.message);
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};
export const getBrands = async () => {
    try {
        let response = await fetch(`http://localhost:5000/api/brand/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        if (response.status === 'fail') {
            throw new Error(response.message);
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};
export const Category = async () => {
    try {
        let response = await fetch(`http://localhost:5000/api/category/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        if (response.status === 'fail') {
            throw new Error(response.message);
        }
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};