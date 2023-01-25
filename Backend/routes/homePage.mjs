import express from "express";
import { isAuth } from "../middleware/is-auth.mjs";
import {
  getHomePage,
  getUserSearchResult,
  getFillteredResults,
  addItemToCart,
} from "../controllers/homePage.mjs";

const homePageRouter = express.Router();

homePageRouter.post("/", getHomePage);

homePageRouter.post("/search", getUserSearchResult);

homePageRouter.post("/filter", getFillteredResults);

homePageRouter.post("/addToCart", isAuth, addItemToCart);

export default homePageRouter;
