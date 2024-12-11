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
import { useNavigate } from "react-router-dom"; // импортируем useNavigate
import { setAddedProducts } from "../store/productSlice/productsSlice"; // Импортируем действие

interface ProductFormData {
	title: string;
	description: string;
	price: string;
	image: string;
}

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

const CreateProduct: React.FC = () => {
	const dispatch = useAppDispatch();
	const addedProducts = useAppSelector((state) => state.products.addedProducts);
	const navigate = useNavigate(); // хук для навигации

	const [formData, setFormData] = useState<ProductFormData>({
		title: "",
		description: "",
		price: "",
		image: "",
	});
	const [isLoading, setIsLoading] = useState<boolean>(false); // Статус загрузки
	const [error, setError] = useState<string | null>(null); // Ошибка создания товара

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null); // Сбрасываем ошибку перед отправкой

		const newProduct = {
			...formData,
			price: parseFloat(formData.price),
			id: Date.now(), // Используем Date.now() для генерации уникального числового идентификатора
		};

		setIsLoading(true);

		try {
			// Отправляем продукт на сервер и обновляем Redux
			await dispatch(createNewProduct(newProduct)).unwrap();
			dispatch(setAddedProducts([...addedProducts, newProduct])); // Обновляем добавленные товары
			setFormData({ title: "", description: "", price: "", image: "" }); // очищаем форму
			navigate("/products"); // перенаправляем на страницу продуктов
		} catch (err) {
			setError("Failed to create product. Please try again.");
		} finally {
			setIsLoading(false); // Снимаем индикатор загрузки
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
