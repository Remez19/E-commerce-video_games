import express from "express";
import { getHomePage, getUserSearchResult } from "../controllers/homePage.mjs";

const homePageRouter = express.Router();

homePageRouter.post("/", getHomePage);

homePageRouter.post("/:keyWords", getUserSearchResult);

export default homePageRouter;
