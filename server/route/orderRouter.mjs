import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middleware/protect.mjs";

const orderRouter = Router();

orderRouter.use(protect).post("/", async (req, res) => {
  const { cart_id, price } = req.body;
  try {
    const data = await connectionPool.query(
      `insert into orders (cart_id, price, status, created_at, updated_at) values
      ($1, $2, $3, $4, $5)`,
      [cart_id, price, "pending", new Date(), new Date()]
    );
    return res.status(200).json({
      message: "order success",
    });
  } catch (e) {
    return res.status(400).json({
      message: "order fail",
    });
  }
});

export default orderRouter;
