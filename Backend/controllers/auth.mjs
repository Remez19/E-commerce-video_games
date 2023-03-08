import { userModel } from "../models/user.mjs";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import sgMail from "@sendgrid/mail";

const SALT_VALUE = process.env.SALT_VALUE || 12;

const secret = process.env.JWT_SECRET || "something secret";

sgMail.setApiKey(process.env.SendGrid_API_KEY);
// sgMail.setApiKey(process.env.SendGrid_API_KEY);

// Hellper function to send emails
const sendEmail = async (msg) => {
  try {
    await sgMail.send(msg);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }
};

export const postLogin = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Input");
      error.messageClient = "Invalid Input.";
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
      error.messageClient = "User with this email not exist.";
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual === false) {
      const error = new Error("Worng password.");
      error.messageClient = "Worng email or password.";
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
      // Will make sure that the token will be expired in 3 hours
      { expiresIn: "3h" }
    );
    res.status(200).json({
      token: token,
      userEmail: loadedUser.email,
      userName: loadedUser.name,
      cart: loadedUser.cart,
      favorites: loadedUser.favorites,
      admin: loadedUser.admin,
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
      error.messageClient = "Invalid Input.";
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
      sendEmail({
        to: user.email,
        from: process.env.SendGrid_From_Email,
        subject: "Reset Your Password",
        dynamic_template_data: {
          userName: user.name,
        },
        template_id: "d-8be3ada7bec84169aa98224f1bf2f134",
      });
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

export const requestResetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Input");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { email } = req.body;
    const user = await userModel.findOne({ email: email });
    const resetPasswordToken = jwt.sign(
      { email: email, id: user._id },
      secret,
      {
        expiresIn: "15m",
      }
    );
    const linkToReset = `http://localhost:3000/new-password/${user._id}/${resetPasswordToken}`;
    sendEmail({
      to: user.email,
      from: process.env.SendGrid_From_Email,
      subject: "Reset Your Password",
      dynamic_template_data: {
        userName: user.name,
        resetLink: linkToReset,
      },
      template_id: "d-bde4e28455844c429d768163f6f69263",
    });
    res.status(200).json({ message: "send you a email to reset" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Input. Please check what you enter.");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { userId, token, newPassword } = req.body;
    const user = await userModel.findById(userId);
    if (!user) {
      throw new Error("Cannot Find User!");
    }
    console.log(user);
    let decodedToken = jwt.verify(token, secret);
    if (!decodedToken) {
      // if it wasnt able to verify
      const error = new Error("Something went worng");
      error.statusCode = 500;
      throw error;
    }
    const newHashedPassword = await bcrypt.hash(newPassword, SALT_VALUE);
    user.password = newHashedPassword;
    await user.save();
    res.status(201).json({
      message: "password change",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
