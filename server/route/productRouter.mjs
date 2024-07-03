import { Router } from "express";
import product from "./product.mjs";
import connectionPool from "../utils/db.mjs";

const productRouter = Router();

productRouter
  .get("/", async (req, res) => {
    const data = await connectionPool.query("select * from users");
    return res.json({
      product: product,
    });
  })
  .get("/:productId", (req, res) => {
    const productId = req.params.productId;
    return res.json({
      product: product[productId],
    });
  });

export default productRouter;
