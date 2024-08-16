import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../authentication/auth";
import Order from "../components/Order";

function CartPage() {
  const { state } = useAuth();

  const [getCartProduct, setGetCartProduct] = useState([]);
  const getCart = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${state.user.id}`
      );
      setGetCartProduct(data.data.product.rows);
    } catch (e) {
      alert("error connection from server");
    }
  };

  const removeProductCart = async (product) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${product.product_id}`
      );
      const newProduct = getCartProduct.filter((item) => {
        return item.product_id !== product.product_id;
      });
      setGetCartProduct(newProduct);
    } catch (e) {
      alert("error connection from server");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <section className="w-[80%] min-h-screen pt-40 flex flex-col items-center">
      <Order product={getCartProduct} />
      {getCartProduct.map((product) => {
        return (
          <div
            key={product.product_id}
            className="w-[50%] mt-10 flex justify-center gap-10 items-center relative
          "
          >
            <button
              onClick={() => {
                removeProductCart(product);
              }}
              className="btn btn-neutral px-4 rounded-full absolute top-4 right-4"
            >
              X
            </button>
            <div className="w-full p-6 h-fit bg-blue-gray-200 rounded-2xl flex  gap-10">
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-52 h-52"
                />
              </div>
              <div className="flex flex-col justify-around">
                <p>Name: {product.name}</p>
                <p>Category: {product.price}</p>
                <p>Price: {product.sum}</p>
                <p>Total: {product.price * product.sum}</p>
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default CartPage;
