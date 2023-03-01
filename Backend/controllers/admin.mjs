import { gameModel } from "../models/game.mjs";
import { validationResult } from "express-validator";

export const addItem = async (req, res, next) => {
  const errors = validationResult(req);
  try {
    if (!errors.isEmpty()) {
      const error = new Error("Invalid Input");
      error.statusCode = 422;
      error.data = errors.array();
      throw error;
    }
    const { name: title, price, description, platforms, youtubeUrl } = req.body;
    let file = req.file;
    let asArr = platforms.split(",");
    const newGame = new gameModel({
      description: description,
      title: title,
      price: price,
      platforms: asArr,
      rating: {
        usersRate: {},
        totalRating: 0,
        averageRating: 1,
      },
      imageUrl: `http://localhost:8080/images/Games_Images/${file.filename}`,
      youtubeUrl: youtubeUrl,
    });
    await newGame.save();
    res.status(201).json({
      message: "new game uploaded",
      newGame: newGame,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.message = "Something went worng with upload";
      err.statusCode = 500;
    }
    next(err);
  }
};
