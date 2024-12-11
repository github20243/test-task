import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./productSlice/productsSlice";

const store = configureStore({
	reducer: {
		[productsSlice.name]: productsSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
