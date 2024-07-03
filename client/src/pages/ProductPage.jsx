import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState({});

  const viewProductServer = async () => {
    const data = await axios.get(
      `http://localhost:4000/product/${params.productId}`
    );
    setProduct(data.data.product);
  };

  useEffect(() => {
    viewProductServer();
  }, []);

  return (
    <>
      <Header />
      <img src={product.image} alt={product.name} className="w-52 h-52" />
      <p>{product.name}</p>
      <p>{product.category}</p>
      <p>{product.price}</p>
    </>
  );
}

export default ProductPage;
