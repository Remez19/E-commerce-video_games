import express from "express";
import { isAuth } from "../middleware/is-auth.mjs";

import {
  removeItem,
  changeCartItemQuantity,
  clearCart,
} from "../controllers/cart.mjs";

const cartPageRouter = express.Router();

cartPageRouter.post("/removeFromCart", isAuth, removeItem);

cartPageRouter.post("/changeCartItemQuantity", isAuth, changeCartItemQuantity);

cartPageRouter.post("/clearCart", isAuth, clearCart);

export default cartPageRouter;
