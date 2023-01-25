import jwt from "jsonwebtoken";
// const ExpiredTokenError = require("jsonwebtoken/lib/TokenExpiredError");

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
      const error = new Error("Not authenticated.");
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
    }
    next(error);
  }
};
