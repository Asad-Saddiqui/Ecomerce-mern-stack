
export const AddtoCart = async (data) => {
    console.log({ mydata : data })
    try {
        // Retrieve user data from localStorage and parse it
        const user = JSON.parse(localStorage.getItem("auth"));

        // Check if user data exists and contains a token
        if (user && user.token) {
            // Make the fetch request
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
            console.log({ responseData });

            // Check response status
            if (responseData.status === 'fail') {
                throw new Error(responseData.message);
            }

            // Return response data
            return responseData;
        } else {
            throw new Error("Please First Login");
        }
    } catch (error) {
        throw new Error(error.message);
    }
};
