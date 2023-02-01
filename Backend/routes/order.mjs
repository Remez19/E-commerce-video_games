import express from "express";

import { payOrder, setNewOrder } from "../controllers/order.mjs";
import { isAuth } from "../middleware/is-auth.mjs";

const orderRouter = new express.Router();

orderRouter.post("/setNewOrder", isAuth, setNewOrder);

orderRouter.post("/payOrder", isAuth, payOrder);

export default orderRouter;
