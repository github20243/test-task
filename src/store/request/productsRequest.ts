import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { Product } from '../productSlice/productsSlice';

const BASE_URL = 'https://fakestoreapi.com';

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Failed to fetch products: " + (err.response?.data || err.message)); // Добавляем уведомление
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Failed to fetch product: " + (err.response?.data || err.message)); // Добавляем уведомление
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (newProduct: Product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, newProduct);
      toast.success("Product created successfully!"); // Добавляем уведомление об успешном создании
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Failed to create product: " + (err.response?.data || err.message)); // Добавляем уведомление об ошибке
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      toast.success("Product deleted successfully!"); // Добавляем уведомление об успешном удалении
      return id;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Failed to delete product: " + (err.response?.data || err.message)); // Добавляем уведомление об ошибке
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, updatedProduct }: { id: number; updatedProduct: Product }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, updatedProduct);
      toast.success("Product updated successfully!"); // Добавляем уведомление об успешном обновлении
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Failed to update product: " + (err.response?.data || err.message)); // Добавляем уведомление об ошибке
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
