import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";
import Header from "../components/Header";

function AuthenticationApp() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route path="/cart/:userId" element={<CartPage />} />
        <Route
          path="/product/:productId/:productName"
          element={<ProductPage />}
        />
      </Routes>
    </>
  );
}

export default AuthenticationApp;
