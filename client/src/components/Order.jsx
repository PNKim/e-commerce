import { useEffect } from "react";
import { useState } from "react";

function Order({ product }) {
  const [total, setTotal] = useState([]);
  function TotalPrice() {
    let result = 0;
    for (let i = 0; i < product.length; i++) {
      let newPrice = product[i].price * product[i].sum;
      result += newPrice;
    }
    setTotal(result);
  }

  useEffect(() => {
    if (product) {
      TotalPrice();
    }
  }, [product]);
  return <button className="self-end">{total}</button>;
}

export default Order;
