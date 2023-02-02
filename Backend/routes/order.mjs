import express from "express";

import {
  payOrder,
  getOrder,
  getUserOrders,
  stripeWebHook,
} from "../controllers/order.mjs";
import { isAuth } from "../middleware/is-auth.mjs";

const orderRouter = new express.Router();

orderRouter.post("/getOrder", isAuth, getOrder);

orderRouter.post("/payOrder", isAuth, payOrder);

orderRouter.post("/getUserOrders", isAuth, getUserOrders);

orderRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebHook
);

export default orderRouter;
