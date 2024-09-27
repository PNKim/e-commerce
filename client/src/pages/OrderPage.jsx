import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

function OrderPage() {
  const { status } = useSelector((state) => {
    return state.counter;
  });

  const [getOrderProduct, setGetOrderProduct] = useState([]);
  const [cartProduct, setCartProduct] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState({});

  const getOrder = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/order/${status.user.id}`
      );
      setGetOrderProduct(data.data.data);
    } catch (e) {
      console.log("error connection from server");
    }
  };

  const getOrderByCartId = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/cart/${
          status.user.id
        }?status=order`
      );
      setCartProduct(data.data.product);
    } catch {
      console.log("error connection from server");
    }
  };

  const showOrder = async (index) => {
    const cart = { ...showOrderDetail };
    if (cart[index] === true) {
      cart[index] = false;
    } else {
      cart[index] = true;
    }
    setShowOrderDetail(cart);
  };

  const filterCart = cartProduct.filter((item) => {
    return item.cart_id === cartId;
  });

  console.log(cartProduct);
  useEffect(() => {
    getOrder();
    getOrderByCartId();
  }, [status]);

  return (
    <>
      <section className="w-full min-h-screen pt-40 flex flex-col xl:flex-row xl:justify-center gap-10">
        <div className="w-full xl:w-[40%] text-2xl flex flex-col items-center gap-10">
          Order History
          {getOrderProduct[0] ? (
            <>
              {getOrderProduct.map((product, index) => {
                return (
                  <div key={index} className="w-full flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCartId(product.cart_id);
                        showOrder(index);
                      }}
                      className="w-full flex justify-center gap-10 items-center relative drop-shadow-xl"
                    >
                      <div className="w-full p-6 h-fit bg-gradient-to-l from-blue-gray-200 to-blue-gray-300 rounded-2xl flex flex-col justify-between sm:flex-row gap-10">
                        <p>Order:{product.order_id}</p>
                        <p>Price:{product.price}</p>
                        <p>Status:{product.status}</p>
                      </div>
                    </button>
                    {showOrderDetail[index] && product.cart_id === cartId && (
                      <div className="p-6 bg-gradient-to-l from-blue-gray-200 to-blue-gray-300">
                        {filterCart.map((item, index) => {
                          return (
                            <>
                              <div key={index}>
                                <p>
                                  {item.name} x {item.sum}
                                </p>
                              </div>
                            </>
                          );
                        })}
                      </div>
                    )}
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
