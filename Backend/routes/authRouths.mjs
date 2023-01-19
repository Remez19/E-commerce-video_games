import express from "express";

import { postLogin, postSignup } from "../controllers/authRoutes.mjs";
// Add checks !
const authRouter = express.Router();

authRouter.post("/login", postLogin);
authRouter.post("/signup", postSignup);

export default authRouter;
