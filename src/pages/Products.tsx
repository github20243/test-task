import React, { useEffect, useState } from "react";
import { Grid, Typography, styled, Button, TextField } from "@mui/material";
import ProductCard from "../components/ProductCard";
import { useAppDispatch, useAppSelector } from "../hooks/CustomHooks";
import { fetchProducts } from "../store/request/productsRequest";
import { deleteProduct } from "../store/request/productsRequest";
import { toggleFavorite } from "../store/productSlice/productsSlice";
import Spinner from "../components/Spinner";

const Products: React.FC = () => {
	const dispatch = useAppDispatch();
	const { products, favorites, isLoading, error, addedProducts } =
		useAppSelector((state) => state.products);

	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage] = useState(8);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		dispatch(fetchProducts());
	}, [dispatch]);

	const handleDelete = async (id: number) => {
		await dispatch(deleteProduct(id)).unwrap();
	};

	const displayedProducts = [...products, ...addedProducts];

	const filteredProducts = displayedProducts.filter((product) => {
		const lowerSearchTerm = searchTerm.toLowerCase();
		return (
			product.title.toLowerCase().includes(lowerSearchTerm) ||
			product.description.toLowerCase().includes(lowerSearchTerm) ||
			product.price.toString().includes(lowerSearchTerm)
		);
	});

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = filteredProducts.slice(
		indexOfFirstProduct,
		indexOfLastProduct
	);

	const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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

	const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

	return (
		<ProductsContainer>
			<ProductsTitle variant="h4">Our Products</ProductsTitle>

			<StyledTextField
				fullWidth
				label="Search Products"
				variant="outlined"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				margin="normal"
			/>

			<Grid container spacing={3} justifyContent="center">
				{currentProducts.length > 0 ? (
					currentProducts.map((product) => (
						<Grid item xs={12} sm={6} md={3} key={product.id}>
							<ProductCard
								id={product.id}
								title={product.title}
								description={product.description}
								image={product.image}
								price={product.price}
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

			{totalPages > 1 && (
				<PaginationContainer>
					{[...Array(totalPages).keys()].map((number) => (
						<Button
							key={number}
							variant="outlined"
							onClick={() => paginate(number + 1)}
							style={{ margin: "0 5px" }}>
							{number + 1}
						</Button>
					))}
				</PaginationContainer>
			)}
		</ProductsContainer>
	);
};

export default Products;

const StyledTextField = styled(TextField)({
	marginBottom: "20px",
	backgroundColor: "#fff",
	borderRadius: "8px",
	boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
	"& .MuiInputBase-root": {
		height: "50px",
	},
	"& .MuiOutlinedInput-notchedOutline": {
		borderColor: "#ccc",
	},
	"&:hover .MuiOutlinedInput-notchedOutline": {
		borderColor: "#00796b",
	},
	"& .MuiInputLabel-root": {
		color: "#00796b",
	},
});

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

const PaginationContainer = styled("div")({
	display: "flex",
	justifyContent: "center",
	marginTop: "20px",
});
