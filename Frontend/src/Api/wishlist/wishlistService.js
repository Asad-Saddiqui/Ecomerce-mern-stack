// wishlistService.js
const base_url = 'http://localhost:5000/api/product/';
const base_urls = 'http://localhost:5000/api/user/';

// Function to add a product to the wishlist
export const addToWishlist = async (prodId) => {
    const user = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch(`${base_url}wishlist`, {
        method: 'Put',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prodId })
    });
    const responseData = await response.json();
    return responseData;
};

// Function to remove a product from the wishlist
export const removeFromWishlist = async (productId) => {
    const user = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch(`${base_url}wishlist/delete/${productId}`, {
        method: 'DELETE',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    });
    const responseData = await response.json();
    return responseData;
};

// Function to fetch the user's wishlist
export const getWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("auth"));
    const response = await fetch(`${base_urls}wishlist`, {
        method: 'GET',
        headers: {
            "authorization": `Bearer ${user.token}`,
            'Content-Type': 'application/json'
        }
    });
    const responseData = await response.json();
    return responseData;
};
