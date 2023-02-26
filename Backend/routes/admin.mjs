import { Router } from "express";

import { isAuthAdmin, isAuth } from "../middleware/is-auth.mjs";
import { addItem } from "../controllers/admin.mjs";
import { body } from "express-validator";

const adminRouter = Router();

adminRouter.post(
  "/add-item",
  isAuth,
  isAuthAdmin,
  [
    body("name").isAlpha().isLength({ min: 1 }),
    body("price")
      .isNumeric()
      .custom((value) => value > 0),
    body("description").isAlphanumeric().isLength({ min: 10 }),
    body("platforms").custom((value) => value.length > 0),
  ],
  addItem
);

export default adminRouter;
