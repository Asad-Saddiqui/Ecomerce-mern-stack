import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const profile = async () => {
    try {
        console.log("Fetching user profile...");
        const response = await axios.get(`${base_url}user/${getTokenFromLocalStorage._id}`, config);
        console.log('response here');
        return response.data;
    } catch (error) {
        console.log("Error fetching user profile:", error.response.data);
        return error.response.data
        // throw error;
    }
};
const updateprofile = async (userdata) => {
    console.log()
    const response = await axios.put(`${base_url}user/edit-user`, userdata, config);
    return response.data;
};


const profile_ = {
    profile,
    updateprofile,

};
export default profile_;
