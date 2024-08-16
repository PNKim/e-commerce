import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Paganation";
import { DebounceInput } from "react-debounce-input";

function MainHomePage() {
  const [searchProduct, setSearchProduct] = useState("");
  const [getProduct, setGetProduct] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);
  const navigate = useNavigate();

  const getData = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product?productName=${searchProduct}`
    );
    setGetProduct(data.data.product);
  };

  const lastProduct = currentPage * productPerPage;
  const firstProduct = lastProduct - productPerPage;
  const product = getProduct.slice(firstProduct, lastProduct);

  const handlePagination = (item) => {
    setCurrentPage(item);
  };

  useEffect(() => {
    getData();
  }, [searchProduct]);

  return (
    <main className="w-[80%] my-5 flex flex-col items-center gap-20 z-1">
      <div className="flex items-center gap-5">
        <label htmlFor="product">search product</label>
        <DebounceInput
          type="text"
          debounceTimeout={300}
          placeholder="name product"
          className="my-5 bg-white text-black"
          value={searchProduct}
          onChange={(e) => {
            setSearchProduct(e.target.value);
          }}
        />
      </div>
      <div className="w-full flex justify-center flex-wrap gap-28">
        {product.map((product) => {
          return (
            <button
              className="p-2 w-full max-w-72 btn h-fit bg-blue-gray-200 text-black text-lg hover:bg-blue-gray-300 border-none flex flex-col"
              key={product.product_id}
              onClick={() => {
                navigate(`/product/${product.product_id}/${product.name}`);
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-56 h-56"
              />
              <div className="w-full flex justify-evenly items-center">
                <p className="flex-1">
                  {product.name.length > 10
                    ? product.name.slice(0, 10) + "..."
                    : product.name}
                </p>
                <p className="flex-1">THB {product.price}</p>
              </div>
            </button>
          );
        })}
      </div>
      <Pagination
        getProduct={getProduct}
        productPerPage={productPerPage}
        handlePagination={handlePagination}
      />
    </main>
  );
}

export default MainHomePage;
