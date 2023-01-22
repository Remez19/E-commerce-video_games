import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  platforms: [
    {
      type: String,
      required: true,
    },
  ],
});

export const gameModel = mongoose.model("Game", gameSchema);
