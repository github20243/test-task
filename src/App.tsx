import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts";
import Products from "./pages/Products";
import CreateProduct from "./pages/CreateProduct";
import ProductDetail from "./pages/ProductDetails";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layouts />}>
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetail />} />
          <Route path="create-product" element={<CreateProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
