import { Router } from "express";
import connectionPool from "../utils/db.mjs";

const productRouter = Router();

productRouter
  .get("/", async (req, res) => {
    const { productName } = req.query;
    try {
      const data = await connectionPool.query(
        `select * from products where name LIKE $1`,
        [`%${productName}%`]
      );

      if (!data.rows[0]) {
        return res.status(404).json({ message: "Not Found" });
      }

      return res.status(200).json({ product: data.rows });
    } catch {
      return res.status(400).json({ message: "Error connection" });
    }
  })
  .get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    try {
      const data = await connectionPool.query(
        `select * from products inner join categories on products.category_id = categories.category_id where product_id=$1`,
        [productId]
      );

      if (!data.rows[0]) {
        return res.status(404).json({ message: "Not Found" });
      }

      return res.status(200).json({ product: data });
    } catch {
      return res.status(400).json({ message: "Error connection" });
    }
  });

export default productRouter;
