import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
	fetchProducts,
	fetchProductById,
	createNewProduct,
	deleteProduct as deleteProductRequest,
} from "../request/productsRequest";

export interface Product {
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
	deletedProductIds: number[];
	addedProducts: Product[];
}

const initialState: ProductsState = {
	products: [],
	currentProduct: null,
	favorites: [],
	isLoading: false,
	error: null,
	deletedProductIds: JSON.parse(
		localStorage.getItem("deletedProductIds") || "[]"
	),
	addedProducts: JSON.parse(localStorage.getItem("addedProducts") || "[]"),
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
		},
		setDeletedProductIds(state, action: PayloadAction<number[]>) {
			state.deletedProductIds = action.payload;
			localStorage.setItem(
				"deletedProductIds",
				JSON.stringify(state.deletedProductIds)
			);
		},
		setAddedProducts(state, action: PayloadAction<Product[]>) {
			state.addedProducts = action.payload;
			localStorage.setItem(
				"addedProducts",
				JSON.stringify(state.addedProducts)
			);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				const filteredProducts = action.payload.filter(
					(product: Product) => !state.deletedProductIds.includes(product.id)
				);

				const newProducts = filteredProducts.filter(
					(product: Product) => !state.products.some((p) => p.id === product.id)
				);

				state.products = [...state.products, ...newProducts];
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
				const newProduct = action.payload; // Получаем новый продукт из действия

				// Проверяем, существует ли товар уже в addedProducts
				const isAlreadyAdded = state.addedProducts.some((p) => p.id === newProduct.id);

				if (!isAlreadyAdded) {
					state.addedProducts.push(newProduct); // Добавляем новый продукт только в добавленные
					localStorage.setItem(
						"addedProducts",
						JSON.stringify(state.addedProducts)
					); // Сохраняем в localStorage
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

				state.products = state.products.filter(
					(product) => product.id !== deletedProductId
				);
				state.addedProducts = state.addedProducts.filter(
					(product) => product.id !== deletedProductId
				);

				localStorage.setItem(
					"deletedProductIds",
					JSON.stringify(state.deletedProductIds)
				);
				localStorage.setItem(
					"addedProducts",
					JSON.stringify(state.addedProducts)
				);

				state.isLoading = false;
			})
			.addCase(deleteProductRequest.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.payload as string;
			});
	},
});

export const { toggleFavorite, setDeletedProductIds, setAddedProducts } =
	productsSlice.actions;
export default productsSlice;
