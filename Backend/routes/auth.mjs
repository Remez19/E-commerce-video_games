import express from "express";
import { body } from "express-validator";
import { userModel } from "../models/user.mjs";

import { postLogin, postSignup } from "../controllers/auth.mjs";
// Add checks !
const authRouter = express.Router();

authRouter.post("/login", postLogin);
authRouter.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        return userModel.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address alreay exists!");
          }
        });
      })
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("userName").trim().not().isEmpty(),
  ],
  postSignup
);

export default authRouter;
