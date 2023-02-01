import { orderModel } from "../models/order.mjs";
import { userModel } from "../models/user.mjs";

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
      console.log(order);
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
    let orderpop = await newOrder.populate("items.itemData");
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
