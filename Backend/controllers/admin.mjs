import { gameModel } from "../models/game.mjs";

export const addItem = (req, res, next) => {
  try {
    const { name, price, description, platforms, image } = req.body;
    console.log(name, price, description, platforms);
    console.log(image);
    res.status(201).json({ message: "new game uploaded" });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next();
  }
};
