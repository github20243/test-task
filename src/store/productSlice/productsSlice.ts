import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductById,
  createNewProduct,
  deleteProduct as deleteProductRequest,
  editProduct,
} from "../request/productsRequest";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  isFavorite?: boolean;
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  favorites: number[];
  isLoading: boolean;
  error: string | null;
  deletedProductIds: number[];
  addedProducts: Product[];
  filter: {
    category: string;
    minPrice: number;
    maxPrice: number;
    searchQuery: string;
  };
}

const initialState: ProductsState = {
  products: JSON.parse(localStorage.getItem("products") || "[]"),
  currentProduct: null,
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  isLoading: false,
  error: null,
  deletedProductIds: JSON.parse(localStorage.getItem("deletedProductIds") || "[]"),
  addedProducts: JSON.parse(localStorage.getItem("addedProducts") || "[]"),
  filter: {
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    searchQuery: "",
  },
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleFavorite(state, action: PayloadAction<number>) {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter((id) => id !== productId);
      } else {
        state.favorites.push(productId);
      }

      try {
        localStorage.setItem("favorites", JSON.stringify(state.favorites));
      } catch (error) {
        console.error("Ошибка при сохранении в localStorage:", error);
      }
    },

    setDeletedProductIds(state, action: PayloadAction<number[]>) {
      state.deletedProductIds = action.payload;
      localStorage.setItem("deletedProductIds", JSON.stringify(state.deletedProductIds));
    },
    setAddedProducts(state, action: PayloadAction<Product[]>) {
      state.addedProducts = action.payload;
      localStorage.setItem("addedProducts", JSON.stringify(state.addedProducts));
    },
    setCategoryFilter(state, action: PayloadAction<string>) {
      state.filter.category = action.payload;
    },
    setPriceFilter(state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) {
      state.filter.minPrice = action.payload.minPrice;
      state.filter.maxPrice = action.payload.maxPrice;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filter.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const filteredProducts = action.payload
          .filter((product: Product) => !state.deletedProductIds.includes(product.id))
          .filter((product: Product) => product.price >= state.filter.minPrice && product.price <= state.filter.maxPrice)
          .filter((product: Product) => state.filter.category ? product.category === state.filter.category : true)
          .filter((product: Product) => state.filter.searchQuery ? product.title.toLowerCase().includes(state.filter.searchQuery.toLowerCase()) : true);

        const newProducts = filteredProducts.filter(
          (product: Product) => !state.products.some((existingProduct) => existingProduct.id === product.id)
        );

        state.products = [...state.products, ...newProducts];

        localStorage.setItem("products", JSON.stringify(state.products));
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createNewProduct.fulfilled, (state, action) => {
        const newProduct = action.payload;
        const isAlreadyAdded = state.addedProducts.some((p) => p.id === newProduct.id);

        if (!isAlreadyAdded) {
          state.addedProducts.push(newProduct);
          localStorage.setItem("addedProducts", JSON.stringify(state.addedProducts));
        }
        state.isLoading = false;
      })
      .addCase(createNewProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProductRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteProductRequest.fulfilled, (state, action) => {
        const deletedProductId = action.payload;

        state.deletedProductIds.push(deletedProductId);

        state.products = state.products.filter((product) => product.id !== deletedProductId);
        state.addedProducts = state.addedProducts.filter((product) => product.id !== deletedProductId);

        localStorage.setItem("deletedProductIds", JSON.stringify(state.deletedProductIds));
        localStorage.setItem("addedProducts", JSON.stringify(state.addedProducts));

        state.isLoading = false;
      })
      .addCase(deleteProductRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.currentProduct = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(editProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;

        const productIndex = state.products.findIndex((product) => product.id === updatedProduct.id);
        if (productIndex !== -1) {
          state.products[productIndex] = updatedProduct;
        }

        const addedProductIndex = state.addedProducts.findIndex((product) => product.id === updatedProduct.id);
        if (addedProductIndex !== -1) {
          state.addedProducts[addedProductIndex] = updatedProduct;
        }

        localStorage.setItem("products", JSON.stringify(state.products));
        localStorage.setItem("addedProducts", JSON.stringify(state.addedProducts));

        state.isLoading = false;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { toggleFavorite, setDeletedProductIds, setAddedProducts } = productsSlice.actions;
export default productsSlice;
