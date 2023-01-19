import express from "express";

import { postLogin } from "../controllers/authRoutes.mjs";
// Add checks !
const authRouter = express.Router();

authRouter.post("/login", postLogin);

export default authRouter;
