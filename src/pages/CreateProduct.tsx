import React, { useState, useEffect } from "react";
import { Button, TextField, styled } from "@mui/material";
import { useAppDispatch } from "../hooks/CustomHooks";
import { createNewProduct } from "../store/request/productsRequest";
import { useNavigate } from "react-router-dom"; // импортируем useNavigate

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
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

const CreateProduct: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate(); // хук для навигации

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newProduct = {
      ...formData,
      price: parseFloat(formData.price),
      id: Date.now(), // уникальный идентификатор для локальных данных
    };

    try {
      await dispatch(createNewProduct(newProduct)).unwrap();
      setFormData({ title: "", description: "", price: "", image: "" }); // очищаем форму
      navigate("/products"); // перенаправляем на страницу продуктов
    } catch (error) {
      console.error("Failed to create product:", error);
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
        <StyledButton type="submit" variant="contained">
          Create Product
        </StyledButton>
      </form>
    </FormContainer>
  );
};

export default CreateProduct;
