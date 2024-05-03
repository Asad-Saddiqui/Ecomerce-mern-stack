export const Category = async () => {
   
        let response = await fetch(`http://localhost:5000/api/category/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        response = await response.json();
        return response;
};