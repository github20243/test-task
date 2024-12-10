import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";
const CREATE_URL = "https://ffd2ce7db1e400c6.mokky.dev"

export const getProducts = async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/products/${id}`);
  return response.data;
};

export const createProduct = async (product: any) => {
  const response = await axios.post(`${CREATE_URL}/product`, product);
  return response.data;
};
