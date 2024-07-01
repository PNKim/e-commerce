import { Carousel } from "@material-tailwind/react";
import { useState } from "react";

function GetDataHomePage() {
  const [searchProduct, setSearchProduct] = useState("");

  return (
    <>
      <Carousel className="rounded-xl w-[80%] h-[50%] flex">
        <div className="w-full h-full flex gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-[100%] w-[50%] object-contain"
          />
          <p>product 1</p>
        </div>
        <div className="w-full h-full flex gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-[100%] w-[50%] object-contain"
          />
          <p>product 2</p>
        </div>

        <div className="w-full h-full flex gap-16 items-center">
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-[100%] w-[50%] object-contain"
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
      <div>product</div>
    </>
  );
}

export default GetDataHomePage;
