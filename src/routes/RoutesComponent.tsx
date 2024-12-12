import { createBrowserRouter, RouterProvider } from "react-router-dom";
import BaseLayout from "../components/Layouts"; 
import Products from "../pages/Products";
import CreateProduct from "../pages/CreateProduct";
import ProductDetail from "../pages/ProductDetails";
import EditProduct from "../components/EditProduct";
import NotFound from "../pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout />, 
    children: [
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />, 
      },
      {
        path: "create-product",
        element: <CreateProduct />,
      },
      {
        path: "edit-product/:id",
        element: <EditProduct />, 
      },
      {
        path: "*", 
        element: <NotFound />,
      },
    ],
  },
]);

const RoutesComponent: React.FC = () => {
  return <RouterProvider router={router} />; 
};

export default RoutesComponent;
