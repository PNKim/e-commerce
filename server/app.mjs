import express from "express";
import cors from "cors";
import productRouter from "./route/productRouter.mjs";
import userRouter from "./route/userRouter.mjs";

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);

app.get("/test", (req, res) => {
  return res.json("Server running!!!");
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
