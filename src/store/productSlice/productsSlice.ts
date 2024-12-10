// store/productsSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { fetchProducts, fetchProductById, createNewProduct } from '../request/productsRequest';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  favorites: number[];
  isLoading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  favorites: [],
  isLoading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter((id) => id !== productId);
      } else {
        state.favorites.push(productId);
      }
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload); // Добавляем новый продукт в список
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavorite, deleteProduct } = productsSlice.actions;
export default productsSlice
