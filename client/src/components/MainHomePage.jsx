import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from "./Paganation";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../redux/productSlice";

function MainHomePage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage] = useState(8);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, searchProduct } = useSelector((state) => state.product);

  const getData = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/product?productName=${searchProduct}`
    );
    dispatch(getProduct(data.data.product));
  };

  const lastProduct = currentPage * productPerPage;
  const firstProduct = lastProduct - productPerPage;
  const product = products.slice(firstProduct, lastProduct);

  const handlePagination = (item) => {
    setCurrentPage(item);
  };

  useEffect(() => {
    getData();
  }, [searchProduct]);

  return (
    <main className="w-[80%] my-20 flex flex-col items-center gap-10 z-1">
      <div className="w-full flex justify-center flex-wrap gap-y-20 gap-x-20">
        {product[0] ? (
          <>
            {product.map((product, index) => {
              return (
                <button
                  className="max-w-60 bg-blue-gray-200 text-black text-lg hover:bg-blue-gray-300 flex flex-col drop-shadow-xl rounded-2xl"
                  key={index}
                  onClick={() => {
                    navigate(`/product/${product.product_id}/${product.name}`);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-60 h-56 rounded-t-2xl"
                  />
                  <div className="w-full p-2 flex justify-evenly items-center">
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
          </>
        ) : (
          <>
            <span className="loading loading-dots loading-lg fixed top-52"></span>
          </>
        )}
      </div>
      <Pagination
        getProduct={products}
        productPerPage={productPerPage}
        handlePagination={handlePagination}
      />
    </main>
  );
}

export default MainHomePage;
