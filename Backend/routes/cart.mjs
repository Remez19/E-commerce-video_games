import express from "express";
import { isAuth } from "../middleware/is-auth.mjs";

import { removeItem } from "../controllers/cart.mjs";

const cartPageRouter = express.Router();

cartPageRouter.post("/removeFromCart", isAuth, removeItem);

export default cartPageRouter;
