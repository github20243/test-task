import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { Product } from '../productSlice/productsSlice'; // Убедитесь, что путь правильный

const BASE_URL = 'https://fakestoreapi.com';

// Получение всех продуктов
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`); // Removed redundant '/products'
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

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
  async (newProduct: Product) => {
    const response = await axios.post(`${BASE_URL}/products`, newProduct); // Убедитесь, что BASE_URL правильный
    return response.data; // Возвращаем данные нового продукта
  }
);

// Удаление товара
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      return id;
    } catch (error) {
      const err = error as AxiosError;
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
