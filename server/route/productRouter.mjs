import { Router } from "express";
import product from "./product.mjs";
import connectionPool from "../utils/db.mjs";

const productRouter = Router();

productRouter
  .get("/", async (req, res) => {
    console.log(1);
    try {
      const data = await connectionPool.query("select * from products");
      return res.json({
        product: data,
      });
    } catch (e) {
      return res.status(404).json({
        message: e,
      });
    }
  })
  .get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const data = await connectionPool.query(
      `select * from products inner join categories on products.category_id = categories.category_id where product_id=$1`,
      [productId]
    );
    return res.json({
      product: data,
    });
  });

export default productRouter;
