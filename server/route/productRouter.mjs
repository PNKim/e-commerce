import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const productRouter = Router();

productRouter
  .get("/", async (req, res) => {
    try {
      const { productName } = req.query;

      const data = await connectionPool.query(
        `select * from products where name LIKE $1`,
        [`%${productName}%`]
      );
      return res.json({
        product: data.rows,
      });
    } catch (e) {
      return res.status(400).json({
        message: "Error connection",
      });
    }
  })
  .get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const data = await connectionPool.query(
      `select * from products inner join categories on products.category_id = categories.category_id where product_id=$1`,
      [productId]
    );
    return res.status(200).json({
      product: data,
    });
  });

export default productRouter;
