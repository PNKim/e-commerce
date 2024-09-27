import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Order({ product }) {
  const { status } = useSelector((state) => {
    return state.counter;
  });
  const [total, setTotal] = useState([]);
  const navigate = useNavigate();

  const TotalPrice = () => {
    let result = 0;
    for (let i = 0; i < product.length; i++) {
      let newPrice = product[i].price * product[i].sum;
      result += newPrice;
    }
    setTotal(result);
  };

  const handleClick = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/order`, data);
      navigate(`/order/${status.user.id}`);
    } catch (e) {
      alert("error connection from server");
    }
  };

  useEffect(() => {
    if (product) {
      TotalPrice();
    }
  }, [product]);
  return (
    <div className="w-full lg:w-60 h-fit p-4 bg-white drop-shadow-xl flex flex-col items-center rounded-2xl gap-4">
      <p className="w-full text-center p-2 bg-blue-gray-50 rounded-2xl">
        Your Order
      </p>
      {product.map((item) => {
        return (
          <>
            <div key={item.product_id}>
              {item.name} x {item.sum}
            </div>
          </>
        );
      })}
      <p>total : {total}</p>
      <button
        type="button"
        onClick={() => {
          handleClick({
            cart_id: product[0].cart_id,
            price: total,
            user_id: status.user.id,
          });
        }}
        className="w-full btn bg-gray-600 text-white border-none rounded-2xl"
      >
        Confirm Order
      </button>
    </div>
  );
}

export default Order;
