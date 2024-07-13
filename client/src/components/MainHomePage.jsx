import { Carousel } from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function MainHomePage() {
  const [searchProduct, setSearchProduct] = useState("");
  const [getProduct, setGetProduct] = useState([]);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await axios.get("http://localhost:4000/product");
    setGetProduct(data.data.product.rows);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <main className="w-[80%] my-5 flex flex-col items-center">
      <Carousel className="rounded-xl flex">
        <div className="w-full flex gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="w-[50%] object-contain"
          />
          <p>product 1</p>
        </div>
        <div className="w-full flex gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="w-[50%] object-contain"
          />
          <p>product 2</p>
        </div>

        <div className="w-full flex gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="w-[50%] object-contain"
          />
          <p>product 3</p>
        </div>
      </Carousel>
      <input
        type="text"
        placeholder="name product"
        className="my-5"
        value={searchProduct}
        onChange={(e) => {
          setSearchProduct(e.target.value);
        }}
      />
      <div className="flex justify-center flex-wrap gap-20">
        {getProduct.map((product) => {
          return (
            <div
              key={product.product_id}
              onClick={() => {
                navigate(`/product/${product.product_id}/${product.name}`);
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-52 h-52"
              />
              <p>{product.name}</p>
              <p>{product.category}</p>
              <p>{product.price}</p>
            </div>
          );
        })}
      </div>
    </main>
  );
}

export default MainHomePage;
