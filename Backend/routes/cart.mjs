import express from "express";
import { isAuth } from "../middleware/is-auth.mjs";

import { removeItem, changeCartItemQuantity } from "../controllers/cart.mjs";

const cartPageRouter = express.Router();

cartPageRouter.post("/removeFromCart", isAuth, removeItem);

cartPageRouter.post("/changeCartItemQuantity", isAuth, changeCartItemQuantity);

export default cartPageRouter;
