import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../authentication/auth";

function CartPage() {
  const { state, checkToken } = useAuth();

  const [getCartProduct, setGetCartProduct] = useState([]);
  const getCart = async () => {
    try {
      const data = await axios.get(
        `http://localhost:4000/cart/${state.user.id}`
      );
      setGetCartProduct(data.data.product.rows);
    } catch (e) {
      alert("error connection from server");
    }
  };

  const removeProductCart = async (product) => {
    try {
      await axios.delete(`http://localhost:4000/cart/${product.product_id}`);
      const newProduct = getCartProduct.filter((item) => {
        return item.product_id !== product.product_id;
      });
      setGetCartProduct(newProduct);
      alert("the product has been remove");
    } catch (e) {
      alert("error connection from server");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <section className="w-[80%] pt-40 flex flex-col items-center">
      <button onClick={checkToken} className="self-end">
        order
      </button>
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
              className="absolute top-1 right-1"
            >
              X
            </button>
            <img src={product.image} alt={product.name} className="w-52 h-52" />
            <div>
              <p>name: {product.name}</p>
              <p>price: {product.price}</p>
              <p>quantity: {product.sum}</p>
              <p>total: {product.price * product.sum}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default CartPage;
