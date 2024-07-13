import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";
import Header from "../components/Header";

function UnAuthenticatedApp() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<HomePage />} />
        <Route
          path="/product/:productId/:productName"
          element={<ProductPage />}
        />
      </Routes>
    </>
  );
}

export default UnAuthenticatedApp;
