import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Импорт стилей для Toastify
import Layouts from "./components/Layouts";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import ProductDetail from "./pages/ProductDetails";
import EditProduct from "./components/EditProduct";

const App: React.FC = () => {
  return (
    <Router>
      <ToastContainer /> {/* Добавляем ToastContainer для отображения уведомлений */}
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="create-product" element={<CreateProduct />} />
          <Route path="edit-product/:id" element={<EditProduct />} />
          {/* Вы можете добавить дополнительные маршруты здесь */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
