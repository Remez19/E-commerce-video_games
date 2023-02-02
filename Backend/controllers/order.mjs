import { orderModel } from "../models/order.mjs";
import { userModel } from "../models/user.mjs";
import pdfkit from "pdfkit";
import fs from "fs";
import path from "path";

import { Stripe } from "stripe";

const stripe = Stripe(process.env.Stripe_Key);

export const getOrder = async (req, res, next) => {
  try {
    const { userEmail } = req.body;
    const user = await userModel.findOne({ email: userEmail });
    const order = await orderModel
      .findOne()
      .sort({ created_at: -1 })
      .populate("items.productData");
    res.status(200).json({
      orderData: order,
      userCart: user.cart,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const payOrder = async (req, res, next) => {
  try {
    // 4242 4242 4242 4242
    const { userEmail } = req.body;
    const user = await userModel
      .findOne({ email: userEmail })
      .populate("cart.items.productData");
    if (!user) {
      throw new Error("User Not found");
    }
    const itemsConvertedForStripe = [];
    for (const cartItem of user.cart.items) {
      itemsConvertedForStripe.push({
        price_data: {
          currency: "usd",
          product_data: {
            name: cartItem.productData.title,
            images: [cartItem.productData.imageUrl],
          },
          unit_amount: cartItem.productData.price * 100,
        },
        quantity: cartItem.quantity,
      });
    }
    const session = await stripe.checkout.sessions.create({
      line_items: itemsConvertedForStripe,
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: "Invoice for your order.",
          metadata: { userId: user._id.toString() },
          custom_fields: [{ name: "Purchase Order", value: "PO-XYZ" }],
          rendering_options: { amount_tax_display: "include_inclusive_tax" },
          footer: "Games Puddle",
        },
      },
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

export const getUserOrders = async (req, res, next) => {
  try {
    const { userEmail } = req.body;
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User Not found");
    }
    const userOrders = await orderModel
      .find({ user: user._id })
      .populate("items.productData");
    res.status(200).json({ userOrders: userOrders });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const stripeWebHook = async (req, res, next) => {
  const sig = req.headers["stripe-signature"];
  const endpointSecret =
    "whsec_a4d68250cced6f5939053451a8428ea627aa347d217807f557f1bed34c9c2ba6";
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    err.statusCode = 400;
    next(err);
  }

  let paymentIntent;
  // Handle the event
  switch (event.type) {
    case "invoice.payment_succeeded":
      // create Order in DB
      paymentIntent = event.data.object;
      const { metadata, hosted_invoice_url } = paymentIntent;
      console.log(metadata.userId);
      const user = await userModel
        .findById(metadata.userId)
        .populate("cart.items.productData");
      console.log(user);
      const newOrder = new orderModel({
        user: user._id,
        items: [...user.cart.items],
        totalPrice: user.cart.totalPrice,
        created_at: Date.now(),
        invoiceUrl: hosted_invoice_url,
      });
      user.cart = {
        items: [],
        totalPrice: 0,
      };
      await user.save();
      await newOrder.save();
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // Return a 200 response to acknowledge receipt of the event
  res.status(201).send();
};
