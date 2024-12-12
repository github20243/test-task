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
      toast.error("Не удалось загрузить продукты: " + (err.response?.data || err.message)); 
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
      toast.error("Не удалось загрузить продукт: " + (err.response?.data || err.message)); 
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createNewProduct = createAsyncThunk(
  "products/createNewProduct",
  async (newProduct: Product, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/products`, newProduct);
      toast.success("Продукт успешно создан!"); 
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Не удалось создать продукт: " + (err.response?.data || err.message)); 
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_URL}/products/${id}`);
      toast.success("Продукт успешно удален!"); 
      return id;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Не удалось удалить продукт: " + (err.response?.data || err.message));
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ id, updatedProduct }: { id: number; updatedProduct: Product }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/products/${id}`, updatedProduct);
      toast.success("Продукт успешно обновлен!"); 
      return response.data;
    } catch (error) {
      const err = error as AxiosError;
      toast.error("Не удалось обновить продукт: " + (err.response?.data || err.message));
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
