import React, { useState } from "react";
import {
	Button,
	TextField,
	styled,
	CircularProgress,
	Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/CustomHooks";
import { createNewProduct } from "../store/request/productsRequest";
import { useNavigate } from "react-router-dom";
import { setAddedProducts } from "../store/productSlice/productsSlice";

interface ProductFormData {
	title: string;
	description: string;
	price: string;
	image: string;
}

const CreateProduct: React.FC = () => {
	const dispatch = useAppDispatch();
	const addedProducts = useAppSelector((state) => state.products.addedProducts);
	const navigate = useNavigate();

	const [formData, setFormData] = useState<ProductFormData>({
		title: "",
		description: "",
		price: "",
		image: "",
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);

		const newProduct = {
			...formData,
			price: parseFloat(formData.price),
			id: Date.now(),
		};

		setIsLoading(true);

		try {
			await dispatch(createNewProduct(newProduct)).unwrap();
			dispatch(setAddedProducts([...addedProducts, newProduct]));
			setFormData({ title: "", description: "", price: "", image: "" });
			navigate("/products");
		} catch (err) {
			setError("Failed to create product. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<FormContainer>
			<Title>Create New Product</Title>
			<form onSubmit={handleSubmit}>
				<StyledTextField
					label="Title"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
				/>
				<StyledTextField
					label="Description"
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
				/>
				<StyledTextField
					label="Price"
					name="price"
					type="number"
					value={formData.price}
					onChange={handleChange}
					required
				/>
				<StyledTextField
					label="Image URL"
					name="image"
					value={formData.image}
					onChange={handleChange}
				/>
				<StyledButton type="submit" variant="contained" disabled={isLoading}>
					{isLoading ? (
						<CircularProgress size={24} color="inherit" />
					) : (
						"Create Product"
					)}
				</StyledButton>
			</form>
			{error && <ErrorMessage>{error}</ErrorMessage>}
		</FormContainer>
	);
};

export default CreateProduct;

const FormContainer = styled("div")({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	margin: "50px auto",
	padding: "20px",
	maxWidth: "500px",
	background: "#f5f5f5",
	borderRadius: "10px",
	boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
});

const StyledTextField = styled(TextField)({
	marginBottom: "15px",
	width: "100%",
});

const StyledButton = styled(Button)({
	marginTop: "10px",
	width: "100%",
	padding: "10px",
	fontSize: "16px",
	backgroundColor: "#1976d2",
	"&:hover": {
		backgroundColor: "#1565c0",
	},
});

const Title = styled("h2")({
	marginBottom: "20px",
	color: "#333",
});

const ErrorMessage = styled(Typography)({
	color: "red",
	marginTop: "10px",
	fontSize: "14px",
});
