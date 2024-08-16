import { Router } from "express";
import connectionPool from "../utils/db.mjs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const userRouter = Router();

userRouter
  .post("/register", async (req, res) => {
    const newUser = {
      ...req.body,
      role: "user",
      created_at: new Date(),
      updated_at: new Date(),
      last_logged_in: new Date(),
    };
    if (
      !newUser.username ||
      !newUser.password ||
      !newUser.firstname ||
      !newUser.lastname ||
      !newUser.address
    ) {
      return res.status(404).json({
        message: "missing data from request",
      });
    }

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    try {
      await connectionPool.query(
        `insert into users (username, password, firstname, lastname, address, role, created_at, updated_at, last_logged_in) 
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          newUser.username,
          newUser.password,
          newUser.firstname,
          newUser.lastname,
          newUser.address,
          newUser.role,
          newUser.created_at,
          newUser.updated_at,
          newUser.last_logged_in,
        ]
      );
      return res.status(200).json({
        message: "Register successfully",
      });
    } catch (e) {
      return res.status(404).json({
        message: "Server connection error",
      });
    }
  })
  .post("/login", async (req, res) => {
    const user = await connectionPool.query(
      `select * from users where username=$1`,
      [req.body.username]
    );

    if (!user.rows[0]) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }

    const isvalidPassword = await bcrypt.compare(
      req.body.password,
      user.rows[0].password
    );

    if (!isvalidPassword) {
      return res.status(404).json({
        message: "Invalid username or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.rows[0].user_id,
        firstname: user.rows[0].firstname,
        lastname: user.rows[0].lastname,
        role: user.rows[0].role,
      },
      process.env.SECRET_KEY,
      { expiresIn: "50000000" }
    );

    return res.status(200).json({
      message: "login successfully",
      token,
    });
  });

export default userRouter;
