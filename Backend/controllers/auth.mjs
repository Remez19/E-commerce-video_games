import { userModel } from "../models/user.mjs";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

const SALT_VALUE = 12;

const secret = process.env.JWT_SECRET;

export const postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Input");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { email, password } = req.body;
    let loadedUser;
    const user = await userModel
      .findOne({ email: email })
      .populate("cart.items.productData");
    if (!user) {
      // User not found
      const error = new Error("User with this email not exist.");
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual === false) {
      const error = new Error("Worng password.");
      error.statusCode = 401;
      throw error;
    }
    // Creating jwt for authentication
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      secret,
      // Will make sure that the token will be expired in 1 hour
      { expiresIn: "1h" }
    );
    res.status(200).json({
      token: token,
      userEmail: loadedUser.email,
      userName: loadedUser.name,
      cart: loadedUser.cart,
      favorites: loadedUser.favorites,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Input");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { email, password, userName } = req.body;

    const user = await userModel.findOne({ email: email });
    if (!user) {
      // it is a new user
      // Hashing password
      const hashedPassword = await bcrypt.hash(password, SALT_VALUE);
      const user = new userModel({
        email: email,
        name: userName,
        password: hashedPassword,
      });
      const result = await user.save();
      res
        .status(201)
        .json({ message: "User created successfully.", userId: result._id });
    } else {
      const error = new Error("User Already exist!.");
      error.statusCode = 409;
      throw error;
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const resetPassword = (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Input");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { email } = req.body;
    // send code to user email address for later check
    res.status(200).json({ message: "send you a email to reset " });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
