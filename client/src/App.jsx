import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductPage from "./pages/ProductPage";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    document.title = "KimShop";
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:productName" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
