import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import { protect } from "../middleware/protect.mjs";

const cartRouter = Router();

cartRouter
  .get("/:id", [protect], async (req, res) => {
    const status = "cart";
    const user_id = req.params.id;
    try {
      const data = await connectionPool.query(
        `select sum(count),carts.cart_id, products.product_id ,products.image, products.name, products.price from carts_products 
        inner join carts on carts_products.cart_id = carts.cart_id
        inner join products on carts_products.product_id = products.product_id 
        where carts.user_id=$1 and carts.status=$2
        group by carts.cart_id,products.product_id`,
        [user_id, status]
      );
      return res.status(200).json({
        product: data,
      });
    } catch (e) {
      return res.status(400).json({
        message: "Error connection",
      });
    }
  })
  .post("/", [protect], async (req, res) => {
    if (req.body.quantity === 0) {
      return res.status(400).json({
        message: "missing data quantity from user",
      });
    }
    const status = "cart";
    try {
      const data = await connectionPool.query(
        `select * from carts where user_id=$1 and status=$2`,
        [req.user.id, status]
      );

      if (!data.rows[0]) {
        const getCartId = await connectionPool.query(
          `insert into carts (user_id ,status) values ($1, $2) returning cart_id
       `,
          [req.user.id, status]
        );
        await connectionPool.query(
          `insert into carts_products (cart_id, product_id, count) values ($1, $2, $3)`,
          [
            getCartId.rows[0].cart_id,
            req.body.product.product_id,
            req.body.quantity,
          ]
        );
      } else {
        await connectionPool.query(
          `insert into carts_products (cart_id, product_id, count) values ($1, $2, $3)`,
          [data.rows[0].cart_id, req.body.product.product_id, req.body.quantity]
        );
      }

      return res.status(200).json({
        message: "create cart success",
      });
    } catch (e) {
      return res.status(400).json({
        message: "Error connection",
      });
    }
  })
  .delete("/:id", [protect], async (req, res) => {
    const productId = req.params.id;
    try {
      await connectionPool.query(
        `delete from carts_products where product_id=$1`,
        [productId]
      );
      return res.status(200).json({
        message: "This product has been removed",
      });
    } catch (e) {
      return res.status(400).json({
        message: "Error connection",
      });
    }
  });

export default cartRouter;
