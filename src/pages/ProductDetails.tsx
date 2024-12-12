import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/CustomHooks";
import { fetchProductById } from "../store/request/productsRequest";
import {
	Button,
	Typography,
	styled,
	CircularProgress,
	Alert,
} from "@mui/material";

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const { currentProduct, isLoading, error, addedProducts } = useAppSelector(
		(state) => state.products
	);

	useEffect(() => {
		if (id) {
			dispatch(fetchProductById(parseInt(id)))
				.unwrap()
				.catch((error) => {
					console.error("Ошибка при загрузке продукта:", error);
				});
		}
	}, [dispatch, id]);

	const localProduct = addedProducts.find(
		(product) => product.id === parseInt(id || "")
	);
	const productToDisplay = currentProduct || localProduct;

	if (isLoading) {
		return (
			<DetailContainer>
				<CircularProgress />
			</DetailContainer>
		);
	}

	if (error) {
		return (
			<DetailContainer>
				<Alert severity="error">{error}</Alert>
			</DetailContainer>
		);
	}

	if (!productToDisplay) {
		return (
			<DetailContainer>
				<Alert severity="warning">Продукт не найден.</Alert>
			</DetailContainer>
		);
	}

	return (
		<DetailContainer>
			<Typography variant="h4" gutterBottom>
				{productToDisplay.title}
			</Typography>
			<ProductImage
				src={productToDisplay.image || "/placeholder.png"}
				alt={productToDisplay.title}
			/>
			<Typography variant="body1">{productToDisplay.description}</Typography>
			<PriceText variant="h6">Price: ${productToDisplay.price}</PriceText>

			<Button
				component={Link}
				to={`/edit-product/${id}`}
				variant="contained"
				sx={{
					marginTop: "30px",
					padding: "10px 20px",
					backgroundColor: "#1976d2",
					"&:hover": {
						backgroundColor: "#1565c0",
					},
				}}>
				Edit Product
			</Button>

			<Button
				component={Link}
				to="/products"
				variant="contained"
				sx={{
					marginTop: "10px",
					padding: "10px 20px",
					backgroundColor: "#1976d2",
					"&:hover": {
						backgroundColor: "#1565c0",
					},
				}}>
				Back to Products
			</Button>
		</DetailContainer>
	);
};

export default ProductDetail;

const DetailContainer = styled("div")({
	maxWidth: "600px",
	margin: "40px auto",
	padding: "20px",
	backgroundColor: "#f9f9f9",
	borderRadius: "10px",
	boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
});

const ProductImage = styled("img")({
	width: "100%",
	height: "auto",
	borderRadius: "10px",
	marginBottom: "20px",
});

const PriceText = styled(Typography)({
	marginTop: "20px",
	fontWeight: "bold",
	color: "#1976d2",
});
