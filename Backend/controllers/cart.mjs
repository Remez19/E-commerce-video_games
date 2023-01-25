import { gameModel } from "../models/game.mjs";
import { userModel } from "../models/user.mjs";

export const removeItem = async (req, res, next) => {
  try {
    const { itemId, userId, price } = req.body;
    const user = userModel.findById(userId).populate("cart.items.productData");
    if (!user) {
      throw new Error("Something went wrong");
    }
    user.cart.items = [
      ...user.cart.items.filter((cartItem) => {
        return cartItem.productData.toString() !== itemId.toString();
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
