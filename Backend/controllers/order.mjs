import { orderModel } from "../models/order.mjs";
import { userModel } from "../models/user.mjs";
import pdfkit from "pdfkit";
import fs from "fs";
import path from "path";

import { Stripe } from "stripe";

const stripe = Stripe(process.env.Stripe_Key);

export const setNewOrder = async (req, res, next) => {
  try {
    const { userEmail } = req.body;
    const user = await userModel
      .findOne({ email: userEmail })
      .populate("cart.items.productData");
    if (!user) {
      throw new Error("user Not found");
    }
    if (user.cart.items.length === 0) {
      const order = await orderModel
        .findOne()
        .sort({ created_at: -1 })
        .populate("items.itemData");

      return res.status(200).json({ userCart: user.cart, orderData: order });
    }
    const ItemsInOrder = user.cart.items.map((item) => {
      return {
        itemData: item.productData._id,
        quantity: Number(item.quantity),
      };
    });
    const newOrder = new orderModel({
      user: user._id,
      items: ItemsInOrder,
      totalPrice: user.cart.totalPrice,
      created_at: Date.now(),
    });
    user.cart = {
      items: [],
      totalPrice: 0,
    };
    await user.save();
    await newOrder.save();
    await newOrder.populate("items.itemData");
    res.status(201).json({
      orderData: newOrder,
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
      .populate("items.itemData");
    res.status(200).json({ userOrders: userOrders });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

export const createInvoicePdf = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await orderModel.findById(orderId).populate("items.itemData");
    if (!order) {
      throw new Error("Something Went Worng");
    }
    const invoiceName = "invoice-" + order._id.toString() + ".pdf";
    const invoicePath = path.join("data", "invoices", invoiceName);
    const pdfDoc = new pdfkit();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="' + invoiceName + '"'
    );
    pdfDoc.pipe(fs.createWriteStream(invoicePath));
    pdfDoc.pipe(res);
    pdfDoc.fontSize(26).text("Invoice", {
      underline: true,
    });
    pdfDoc.text("--------------------------------");
    order.items.forEach((prod) => {
      pdfDoc
        .fontSize(14)
        .text(
          `${prod.itemData.title} - ${prod.quantity} x $${prod.itemData.price}`
        );
    });
    pdfDoc.fontSize(26).text("--------------------------------");
    pdfDoc.font("Courier-Bold").fontSize(20).text("Total Price:", {
      underline: true,
    });
    pdfDoc
      .font("Courier-Bold")
      .fontSize(18)
      .text("$" + order.totalPrice);
    // Tell node when we are done to writing to this stream
    pdfDoc.end();
    res.download(invoicePath);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

/**
 * exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;
  // Check if the user is autherized to download this invoice
  Order.findById(orderId)
    .then((order) => {
      if (!order) {
        return next(new Error("No Order Found"));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error("Unauthorized"));
      }
      const invoiceName = "invoice-" + orderId + ".pdf";
      const invoicePath = path.join("data", "invoices", invoiceName);

      // Creates a new pdf document
      // it is also a readable stream
      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      // Allows us to define how this content should be served
      res.setHeader(
        "Content-Disposition",
        'attachment; filename="' + invoiceName + '"'
      );
      // Pipe it to a writeable stream
      // To fs.createWriteStream() - we pass a path to define were to store the file
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      // Adding font size to the text
      // We can pass in an object to define more attributes to the text
      pdfDoc.fontSize(26).text("Invoice", {
        underline: true,
      });
      pdfDoc.text("--------------------------------");
      let totalPrice = 0;
      order.products.forEach((prod) => {
        pdfDoc
          .fontSize(14)
          .text(
            `${prod.productData.title} - ${prod.quantity} x $${prod.productData.price}`
          );
        totalPrice += prod.quantity * prod.productData.price;
      });
      pdfDoc.fontSize(26).text("--------------------------------");
      pdfDoc.font("Courier-Bold").fontSize(20).text("Total Price:", {
        underline: true,
      });
      pdfDoc
        .font("Courier-Bold")
        .fontSize(18)
        .text("$" + totalPrice);
      // Tell node when we are done to writing to this stream
      pdfDoc.end();
    })
    .catch((err) => {
      return next(err);
    });
};
 */
