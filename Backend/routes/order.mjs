import express from "express";

import {
  createInvoicePdf,
  payOrder,
  setNewOrder,
  getUserOrders,
} from "../controllers/order.mjs";
import { isAuth } from "../middleware/is-auth.mjs";

const orderRouter = new express.Router();

orderRouter.post("/setNewOrder", isAuth, setNewOrder);

orderRouter.post("/payOrder", isAuth, payOrder);

orderRouter.post("/getUserOrders", isAuth, getUserOrders);

orderRouter.post("/createOrderInvoice", isAuth, createInvoicePdf);

export default orderRouter;
