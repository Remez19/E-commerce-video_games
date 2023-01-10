import express from "express";
import {
  getHomePage,
  getUserSearchResult,
  getFillteredResults,
} from "../controllers/homePage.mjs";

const homePageRouter = express.Router();

homePageRouter.post("/", getHomePage);

homePageRouter.post("/search", getUserSearchResult);

homePageRouter.post("/filter", getFillteredResults);

export default homePageRouter;
