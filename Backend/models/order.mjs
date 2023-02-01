import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      itemData: {
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
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const orderModel = mongoose.model("Order", orderSchema);
