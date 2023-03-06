import jwt from "jsonwebtoken";
import { userModel } from "../models/user.mjs";

import { config } from "dotenv";

config();

const secret = process.env.JWT_SECRET;

export const isAuth = (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
      const error = new Error("Not authenticated.");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    let decodedToken = jwt.verify(token, secret);
    if (!decodedToken) {
      // if it wasnt able to verify
      const error = new Error("Token Expired.");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    if (
      error instanceof jwt.TokenExpiredError ||
      error instanceof jwt.JsonWebTokenError
    ) {
      error.statusCode = 401;
    }
    if (!error.statusCode) {
      error.statusCode = 500;
      error.messageClient = "Something Went Wrong";
    }
    next(error);
  }
};

export const isAuthAdmin = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    if (!user) {
      const error = new Error("User Not Found.");
      error.statusCode = 401;
      throw error;
    }
    if (!user.admin) {
      // Check if the user is of type admin
      const error = new Error("You are not allowed.");
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (error) {
    if (!error.statusCode) {
      err.messageClient = "Something Went Wrong";
      err.statusCode = 500;
    }
    next(err);
  }
};
