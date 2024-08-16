import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../authentication/auth";

function ProductPage() {
  const params = useParams();
  const { seenLogin, setSeenLogin } = useAuth();
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
      setSeenLogin(true);
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
      <div className="w-[80%] p-6 h-fit bg-blue-gray-200 rounded-2xl flex flex-col lg:flex-row items-center lg:justify-around gap-10">
        <div className="min-w-60 h-60">
          <img
            src={product.image}
            alt={product.name}
            className="w-60 h-60 rounded-2xl"
          />
        </div>
        <div className="w-[80%] flex flex-col justify-around gap-4">
          <p>Name : {product.name}</p>
          <p>Category : {product.category}</p>
          <p>Price : {product.price}</p>
          <p>Quantity : {product.quantity}</p>
          <p className="flex-">{product.description}</p>
          <span className="mt-2 self-end flex items-center text-xl gap-5 scale-90 lg:scale-100">
            <button
              type="button"
              className="btn btn-neutral px-[18px] text-2xl rounded-full"
              onClick={minus}
            >
              -
            </button>
            <span>{quantity}</span>
            <button
              type="button"
              className="btn btn-neutral px-4 text-2xl rounded-full"
              onClick={plus}
            >
              +
            </button>
            <button
              type="button"
              className="btn btn-outline bg-blue-gray-600 text-white"
              onClick={() => {
                addToCart();
              }}
            >
              add to cart
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}

export default ProductPage;
