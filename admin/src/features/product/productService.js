import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProducts = async () => {
  const response = await axios.get(`${base_url}product/`);

  return response.data;
};

const createProduct = async (product) => {
  const response = await axios.post(`${base_url}product/`, product, config);

  return response.data;
};
const updateAproduct = async (data) => {
  console.log({ data })
  const response = await axios.put(`${base_url}product/${data.id}`, data.formData, config);

  return response.data;
};
const getaproduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`, config);

  return response.data;
};
const deteletProduct = async (id) => {
  const response = await axios.delete(`${base_url}product/${id}`, config);

  return response.data;
};

const productService = {
  getProducts,
  createProduct,
  getaproduct,
  updateAproduct,
  deteletProduct
};

export default productService;
