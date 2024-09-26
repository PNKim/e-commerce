import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middleware/protect.mjs";

const orderRouter = Router();

orderRouter
  .use(protect)
  .get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
      const data = await connectionPool.query(
        `select * from orders where user_id = $1`,
        [id]
      );
      return res.status(200).json({
        data: data.rows,
      });
    } catch (e) {
      return res.status(400).json({
        message: "Error connection",
      });
    }
  })
  .post("/", async (req, res) => {
    const { cart_id, user_id, price } = req.body;
    try {
      await connectionPool.query(
        `insert into orders (cart_id, user_id, price, status, created_at, updated_at) values
      ($1, $2, $3, $4, $5, $6)`,
        [cart_id, user_id, price, "pending", new Date(), new Date()]
      );

      await connectionPool.query(
        `update carts set status = $1 where cart_id = $2`,
        ["order", cart_id]
      );
      return res.status(200).json({
        message: "order success",
      });
    } catch (e) {
      return res.status(400).json({
        message: "Error connection",
      });
    }
  });

export default orderRouter;
