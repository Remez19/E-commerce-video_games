import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userShema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        productData: {
          type: Schema.Types.ObjectId,
          ref: "Game",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

export const userModel = mongoose.model("User", userShema);
