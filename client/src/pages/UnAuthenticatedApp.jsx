import { Route, Routes } from "react-router-dom";
import HomePage from "./HomePage";
import ProductPage from "./ProductPage";

function UnAuthenticatedApp() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/product/:productId/:productName"
        element={<ProductPage />}
      />
    </Routes>
  );
}

export default UnAuthenticatedApp;
