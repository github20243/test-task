import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/CustomHooks";
import { fetchProductById, editProduct } from "../store/request/productsRequest";
import { Product } from "../store/productSlice/productsSlice";
import { TextField, Button, Grid, Typography, CircularProgress, Alert } from "@mui/material";

const EditProduct: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentProduct, isLoading, error, addedProducts } = useAppSelector(
    (state) => state.products
  );

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id))); // Загружаем продукт при монтировании компонента
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentProduct && currentProduct.id === Number(id)) {
      setTitle(currentProduct.title);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
      setImage(currentProduct.image);
    } else {
      // Если продукт не найден среди текущих данных, проверим локальные товары
      const localProduct = addedProducts.find((product) => product.id === Number(id));
      if (localProduct) {
        setTitle(localProduct.title);
        setDescription(localProduct.description);
        setPrice(localProduct.price);
        setImage(localProduct.image);
      }
    }
  }, [currentProduct, id, addedProducts]);

  const handleSave = () => {
    if (!id) return; // Проверяем, чтобы ID был доступен
  
    const updatedProduct: Product = {
      id: Number(id),
      title,
      description,
      price,
      image,
    };
  
    // Если продукт загружен с API, обновляем его
    if (currentProduct) {
      dispatch(editProduct({ id: Number(id), updatedProduct }))
        .unwrap()
        .then(() => {
          navigate("/products"); // Переход после успешного сохранения
        })
        .catch((error) => {
          console.error("Failed to update product:", error);
        });
    } else {
      // Если продукт локальный, обновляем локальные данные
      const updatedLocalProducts = addedProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      );
      dispatch({ type: "products/setAddedProducts", payload: updatedLocalProducts });
      navigate("/products");
    }
  };
  

  const handleCancel = () => {
    navigate("/products"); // Переход к списку продуктов без изменений
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImage(url);
  };

  if (isLoading) {
    return (
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Alert severity="error">{error}</Alert>
      </Grid>
    );
  }

  if (!currentProduct && !addedProducts.some((product) => product.id === Number(id))) {
    return (
      <Grid container justifyContent="center" alignItems="center" spacing={3}>
        <Alert severity="warning">Product not found.</Alert>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h5">Edit Product</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Price"
          fullWidth
          type="number"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Image URL"
          fullWidth
          value={image}
          onChange={handleImageChange} // Сохранение нового URL для изображения
        />
        {/* Добавляем предварительный просмотр изображения */}
        {image && (
          <div style={{ marginTop: 10 }}>
            <Typography variant="body1">Image Preview:</Typography>
            <img src={image} alt="Image preview" style={{ maxWidth: "100%", maxHeight: "200px" }} />
          </div>
        )}
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          disabled={isLoading}
        >
          Save
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleCancel}
          disabled={isLoading}
          sx={{ marginLeft: "10px" }}
        >
          Cancel
        </Button>
      </Grid>
    </Grid>
  );
};

export default EditProduct;
