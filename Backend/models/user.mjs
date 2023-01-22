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
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Game",
    },
  ],
});

export const userModel = mongoose.model("User", userShema);
