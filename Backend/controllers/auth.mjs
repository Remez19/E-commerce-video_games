import { userModel } from "../models/user.mjs";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { Stripe } from "stripe";
import { config } from "dotenv";

config();

const stripe = Stripe(process.env.Stripe_Key);

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

export const payOrder = async (req, res, next) => {
  try {
    const { userEmail } = req.body;
    const user = await userModel
      .findOne({ email: userEmail })
      .populate("cart.items.productData");
    if (!user) {
      throw new Error("User Not found");
    }
    const itemsConvertedForStripe = [];
    for (const cartItem of user.cart.items) {
      console.log(cartItem);
      itemsConvertedForStripe.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: cartItem.productData.title,
          },
          unit_amount: cartItem.productData.price * 100,
        },
        quantity: cartItem.quantity,
      });
    }
    const session = await stripe.checkout.sessions.create({
      line_items: itemsConvertedForStripe,
      mode: "payment",
      success_url: `${process.env.CLIENT_URL}/checkout-sucess`,
      cancel_url: `${process.env.CLIENT_URL}/shop`,
    });
    res.send({ url: session.url });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
