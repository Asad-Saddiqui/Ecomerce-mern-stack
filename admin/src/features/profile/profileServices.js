import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const getTokenFromLocalStorage = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
const profile = async () => {
    const response = await axios.get(`${base_url}user/${getTokenFromLocalStorage._id}`, config);
    console.log({ response })
    return response.data;
};
const updateprofile = async (userdata) => {
    console.log()
    const response = await axios.put(`${base_url}user/edit-user`,userdata,config);
    return response.data;
};


const profile_ = {
    profile,
    updateprofile,

};
export default profile_;
