import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";
const login = async (user) => {
  const response = await axios.post(`${base_url}user/admin-login`, user);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    localStorage.setItem("refreshToken", JSON.stringify(response.data.refreshToken));
  }
  return response.data;
};
const getOrders = async () => {
  const response = await axios.get(`${base_url}user/getallorders`, config);

  return response.data;
};
const getOrder = async (id) => {
  const response = await axios.post(
    `${base_url}user/getorderbyuser/${id}`,
    "",
    config
  );

  return response.data;
};
const updateOrder = async (data) => {
  const response = await axios.put(
    `${base_url}user/order/update-order/${data._id}`,
    { status: data.selector },
    config
  );

  return response.data;
};
const deleteorder = async (data) => {
  const response = await axios.delete(
    `${base_url}user/order/${data._id}`,
    config
  );

  return response.data;
};

const authService = {
  login,
  getOrders,
  getOrder,
  updateOrder,
  deleteorder,
};

export default authService;
