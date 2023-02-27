import mongoose from "mongoose";

const Schema = mongoose.Schema;

const gameSchema = new Schema(
  {
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
    imageUrl: {
      type: String,
      required: true,
    },
    platforms: [
      {
        type: String,
        required: true,
      },
    ],
    rating: {
      usersRate: {
        type: Object,
        required: true,
      },
      totalRating: {
        type: Number,
        default: 0,
        required: true,
      },
      averageRating: {
        type: Number,
        default: 1,
        required: true,
      },
    },
    youtubeUrl: {
      type: String,
      required: true,
    },
  },
  { minimize: false }
);

export const gameModel = mongoose.model("Game", gameSchema);
