import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useAuth } from "../authentication/auth";

function OrderPage() {
  const { state } = useAuth();
  console.log(state);

  const [getCartProduct, setGetCartProduct] = useState([]);
  const getCart = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/${state.user.id}`
      );
      setGetCartProduct(data.data.data);
    } catch (e) {
      alert("error connection from server");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <section className="w-full min-h-screen pt-40 flex flex-col lg:flex-row justify-center gap-10">
        <div className="w-full sm:w-[70%] xl:w-[30%] text-2xl flex flex-col items-center gap-10">
          Order History
          {getCartProduct.map((product) => {
            return (
              <div
                key={product.user_id}
                className="w-full flex justify-center gap-10 items-center relative
          "
              >
                <div className="w-full p-6 h-fit bg-blue-gray-200 rounded-2xl flex flex-col justify-between sm:flex-row gap-10">
                  <p>Order: {product.order_id}</p>
                  <p>Price: {product.price}</p>
                  <p>Status: {product.status}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

export default OrderPage;
