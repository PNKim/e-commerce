import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

function AuthenticationApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/product/:productId/:productName"
        element={<ProductPage />}
      />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default AuthenticationApp;
