/**
 * Can pick better codes for the status response
 */
import { gameModel } from "../models/game.mjs";

const GAMES_PER_PAGE = 8;

export const getHomePage = async (req, res, next) => {
  // Check for errors before anything if needed!
  const pageNumber = req.body.page;
  try {
    // Pageniation needed
    const gamesList = await gameModel
      .find()
      .skip((pageNumber - 1) * GAMES_PER_PAGE)
      .limit(GAMES_PER_PAGE);
    res.status(200).json({
      message: "Fetched games",
      games: gamesList,
    });
  } catch (err) {
    if (!err.statusCode) {
      // Server error
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getUserSearchResult = async (req, res, next) => {
  // Check for errors before anything if needed!

  try {
    const { keyWords } = req.body;
    if (keyWords) {
      const gamesList = await gameModel.find({
        title: new RegExp(`^${keyWords}`),
      });
      if (gamesList.length === 0) {
        // result set empty
        res.status(200).json({
          message: "No games Found",
          games: gamesList,
        });
      } else {
        res.status(200).json({
          message: "Search Successfull.",
          games: gamesList,
        });
      }
    } else {
      const gamesList = await gameModel.find();
      res.status(200).json({
        message: "Search Successfull.",
        games: gamesList,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      // Server error
      err.statusCode = 500;
    }
    next(err);
  }
};

export const getFillteredResults = async (req, res, next) => {
  try {
    const { filter } = req.body;
    if (!filter) {
      throw new Error("No fillter in request");
    }
    const filterResult = await gameModel.find({ platforms: filter });
    console.log();
    if (filterResult.length === 0) {
      // result set empty
      res.status(200).json({
        message: "No games Found",
        games: filterResult,
      });
    } else {
      res.status(200).json({
        message: "Filter Successfull.",
        games: filterResult,
      });
    }
  } catch (err) {
    if (!err.statusCode) {
      // Server error
      err.statusCode = 500;
    }
    next(err);
  }
};
