import { gameModel } from "../models/game.mjs";
import { userModel } from "../models/user.mjs";

export const removeItem = async (req, res, next) => {
  try {
    const { itemId, userEmail, price } = req.body;
    const user = await userModel
      .findOne({ email: userEmail })
      .populate("cart.items.productData");
    if (!user) {
      throw new Error("Something went wrong");
    }
    user.cart.items = [
      ...user.cart.items.filter((cartItem) => {
        return cartItem.productData._id.toString() !== itemId.toString();
      }),
    ];
    user.cart.totalPrice -= price;
    await user.save();
    res
      .status(201)
      .json({ message: "Item deleted from cart.", newCart: user.cart });
  } catch (err) {
    if (!err.statusCode) {
      // Server error
      err.statusCode = 500;
    }
    next(err);
  }
};

export const changeCartItemQuantity = async (req, res, next) => {
  try {
    const { itemId, userEmail, price, operation } = req.body;
    const user = await userModel
      .findOne({ email: userEmail })
      .populate("cart.items.productData");
    if (!user) {
      throw new Error("Something went wrong");
    }
    const itemIndex = user.cart.items.findIndex((cartItem) => {
      return cartItem.productData._id.toString() === itemId.toString();
    });
    if (operation === "-") {
      if (user.cart.items[itemIndex].quantity === 1) {
        user.cart.items.splice(itemIndex, 1);
      } else {
        user.cart.items[itemIndex].quantity -= 1;
      }
      user.cart.totalPrice -= price;
      await user.save();
      res
        .status(201)
        .json({ message: "Item deleted from cart.", newCart: user.cart });
    } else {
      user.cart.items[itemIndex].quantity += 1;
      user.cart.totalPrice += price;
      await user.save();
      res
        .status(201)
        .json({ message: "Item added to cart.", newCart: user.cart });
    }
  } catch (err) {
    if (!err.statusCode) {
      // Server error
      err.statusCode = 500;
    }
    next(err);
  }
};
