import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function OrderPage() {
  const { status } = useSelector((state) => {
    return state.counter;
  });

  const [getOrderProduct, setGetOrderProduct] = useState([]);
  const getCart = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/${status.user.id}`
      );
      setGetOrderProduct(data.data.data);
    } catch (e) {
      console.log("error connection from server");
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <section className="w-full min-h-screen pt-40 flex flex-col xl:flex-row xl:justify-center gap-10">
        <div className="w-full xl:w-[40%] text-2xl flex flex-col items-center gap-10">
          Order History
          {getOrderProduct[0] ? (
            <>
              {getOrderProduct.map((product) => {
                return (
                  <div
                    key={product.user_id}
                    className="w-full flex justify-center gap-10 items-center relative drop-shadow-xl"
                  >
                    <div className="w-full p-6 h-fit bg-blue-gray-200 rounded-2xl flex flex-col justify-between sm:flex-row gap-10">
                      <p>Order:{product.order_id}</p>
                      <p>Price:{product.price}</p>
                      <p>Status:{product.status}</p>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <>
              <span className="loading loading-dots loading-lg fixed top-52"></span>
            </>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderPage;
