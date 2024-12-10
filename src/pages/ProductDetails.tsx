import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/CustomHooks";
import { fetchProductById } from "../store/request/productsRequest";
import { Button, Typography, styled } from "@mui/material";

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

const ProductDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const dispatch = useAppDispatch();
	const { currentProduct } = useAppSelector((state) => state.products);

	useEffect(() => {
		if (id) {
			dispatch(fetchProductById(parseInt(id)));
		}
	}, [dispatch, id]);

	if (!currentProduct) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<DetailContainer>
			<Typography variant="h4" gutterBottom>
				{currentProduct.title}
			</Typography>
			<ProductImage src={currentProduct.image} alt={currentProduct.title} />
			<Typography variant="body1">{currentProduct.description}</Typography>
			<PriceText variant="h6">Price: ${currentProduct.price}</PriceText>
			<Button
				component={Link}
				to="/products"
				variant="contained"
				sx={{
					marginTop: "30px",
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
