import { userModel } from "../models/user.mjs";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
// import  from "../models/user.mjs";

const SALT_VALUE = 12;

export const postLogin = (req, res, next) => {
  const { email, password } = req.body;
};

export const postSignup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Invalid Input");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const { email, password, userName } = req.body;
  console.log(email, password, userName);
  console.log("Signup");
  try {
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
