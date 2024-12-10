// request/productsRequest.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

const BASE_URL = "https://fakestoreapi.com";
const CREATE_URL = "https://ffd2ce7db1e400c6.mokky.dev";

// Получение всех продуктов
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(`${BASE_URL}/products`);
  return response.data;
});

// Получение продукта по ID
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
  }
);

// Создание нового продукта
export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (newProduct: { title: string; description: string; price: number; image: string }, { rejectWithValue }) => {
    try {
      // Используем правильный URL API для добавления нового продукта
      const response = await axios.post(`${CREATE_URL}/product`, newProduct);
      return response.data; // Возвращаем данные продукта после успешного добавления
    } catch (error) {
      const err = error as AxiosError;
      console.error("Error creating product:", err);
      return rejectWithValue(err.response?.data || err.message); // Если ошибка, возвращаем сообщение об ошибке
    }
  }
);
