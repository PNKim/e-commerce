import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../authentication/auth";

function ProductPage() {
  const params = useParams();
  const { checkToken, seenLogin } = useAuth();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(0);

  const viewProductServer = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/${params.productId}`
      );
      setProduct(data.data.product.rows[0]);
    } catch (e) {
      alert("error connection from server");
    }
  };

  const addToCart = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/cart`, {
        product: product,
        quantity: quantity,
      });
      setQuantity(0);
      alert("add product to cart success");
    } catch (e) {
      alert("error connection from server");
    }
  };

  const minus = () => {
    let newQuantity = quantity;
    newQuantity--;
    if (newQuantity < 0) newQuantity = 0;
    setQuantity(newQuantity);
  };

  const plus = () => {
    let newQuantity = quantity;
    newQuantity++;
    if (newQuantity > product.quantity) newQuantity = product.quantity;
    setQuantity(newQuantity);
  };

  useEffect(() => {
    viewProductServer();
  }, []);

  return (
    <section
      className={
        seenLogin
          ? "h-screen pt-40 flex justify-center opacity-30 gap-10"
          : "h-screen pt-40 flex justify-center gap-10"
      }
    >
      <div>
        <img src={product.image} alt={product.name} className="w-72 h-72" />
      </div>
      <div className="flex flex-col">
        <p>{product.name}</p>
        <p>{product.category}</p>
        <p>{product.price}</p>
        <p>{product.quantity}</p>
        <p className="flex-">{product.description}</p>
        <span className="mt-2 self-end flex items-center text-xl gap-5">
          <button type="button" onClick={minus}>
            -
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={plus}>
            +
          </button>
          <button
            type="button"
            className="btn btn-outline bg-blue-gray-600 text-white"
            onClick={() => {
              // checkToken();
              // addToCart();
            }}
          >
            add to cart
          </button>
        </span>
      </div>
    </section>
  );
}

export default ProductPage;
