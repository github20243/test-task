import React, { useEffect } from "react";
import { Grid, Typography, styled } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/CustomHooks";
import { fetchProducts } from "../store/request/productsRequest";
import { deleteProduct } from "../store/request/productsRequest";
import { toggleFavorite } from "../store/productSlice/productsSlice";
import Spinner from "../components/Spinner";

const ProductsContainer = styled("div")({
	padding: "20px",
	backgroundColor: "#f4f4f9",
	minHeight: "100vh",
});

const LoadingContainer = styled("div")({
	display: "flex",
	justifyContent: "center",
	alignItems: "center",
	height: "100vh",
});

const ProductsTitle = styled(Typography)({
	textAlign: "center",
	marginBottom: "20px",
	fontWeight: "bold",
	color: "#333",
});

const Products: React.FC = () => {
	const dispatch = useAppDispatch();
	const { products, favorites, isLoading, error, addedProducts } =
		useAppSelector((state) => state.products);

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleDelete = async (id: number) => {
		await dispatch(deleteProduct(id)).unwrap();
	};

	// Объединяем оба списка продуктов: полученные и добавленные
	const displayedProducts = [
		...products.filter(
			(product) =>
				!addedProducts.some((addedProduct) => addedProduct.id === product.id)
		), // Добавляем продукты с сервера, которых нет в добавленных
		...addedProducts, // Добавляем только добавленные товары
	];

	if (isLoading) {
		return (
			<LoadingContainer>
				<Spinner isLoading={isLoading} />
			</LoadingContainer>
		);
	}

	if (error) {
		return (
			<LoadingContainer>
				<Typography variant="h6" color="error">
					Error loading products: {error}
				</Typography>
			</LoadingContainer>
		);
	}

	return (
		<ProductsContainer>
			<ProductsTitle variant="h4">Our Products</ProductsTitle>
			<Grid container spacing={3} justifyContent="center">
				{displayedProducts.length > 0 ? (
					displayedProducts.map((product) => (
						<Grid item xs={12} sm={6} md={3} key={product.id}>
							<ProductCard
								id={product.id}
								title={product.title}
								description={product.description}
								image={product.image}
								isFavorite={favorites.includes(product.id)}
								onToggleFavorite={() => dispatch(toggleFavorite(product.id))}
								onDelete={() => handleDelete(product.id)}
							/>
						</Grid>
					))
				) : (
					<Typography variant="h6" textAlign="center" color="gray">
						No products available.
					</Typography>
				)}
			</Grid>
		</ProductsContainer>
	);
};

export default Products;
