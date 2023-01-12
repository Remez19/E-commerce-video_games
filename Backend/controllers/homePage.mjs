/**
 * Can pick better codes for the status response
 */
import { gameModel } from "../models/game.mjs";

const GAMES_PER_PAGE = 8;

export const getHomePage = async (req, res, next) => {
  // Check for errors before anything if needed!
  const pageNumber = req.body.pageNumber;

  try {
    // Pageniation needed

    const skip = (pageNumber - 1) * GAMES_PER_PAGE;
    const totalGames = await gameModel.find().countDocuments();
    const gamesList = await gameModel.find().skip(skip).limit(GAMES_PER_PAGE);
    const loadedGames = pageNumber * GAMES_PER_PAGE;
    // console.log(`TotalGames: ${totalGames}`);
    // console.log(`Skip: ${skip}`);
    res.status(200).json({
      message: "Fetched games",
      games: gamesList,
      hasMore: totalGames > loadedGames,
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
    const { keyWords, pageNumber } = req.body;
    const skip = (pageNumber - 1) * GAMES_PER_PAGE;
    const loadedGames = pageNumber * GAMES_PER_PAGE;

    console.log(`Page number: ${pageNumber}`);

    if (keyWords) {
      // Number of total docs in db
      const totalGames = await gameModel
        .find({
          title: new RegExp(`^${keyWords}`),
        })
        .countDocuments();

      const gamesList = await gameModel
        .find({
          title: new RegExp(`^${keyWords}`),
        })
        .skip(skip)
        .limit(GAMES_PER_PAGE);
      if (gamesList.length === 0) {
        // result set empty
        res.status(200).json({
          message: "No games Found",
          games: gamesList,
          hasMore: false,
        });
      } else {
        res.status(200).json({
          message: "Search Successfull.",
          games: gamesList,
          hasMore: totalGames > loadedGames,
        });
      }
    } else {
      const totalGames = await gameModel.find().countDocuments();
      const gamesList = await gameModel.find().skip(skip).limit(GAMES_PER_PAGE);
      res.status(200).json({
        message: "Search Successfull.",
        games: gamesList,
        hasMore: totalGames > loadedGames,
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
    const { filter, pageNumber } = req.body;
    if (!filter) {
      throw new Error("No fillter in request");
    }
    const skip = (pageNumber - 1) * GAMES_PER_PAGE;
    const loadedGames = pageNumber * GAMES_PER_PAGE;
    const totalGames = await gameModel
      .find({ platforms: filter })
      .countDocuments();
    const filterResult = await gameModel
      .find({ platforms: filter })
      .skip(skip)
      .limit(GAMES_PER_PAGE);
    if (!totalGames) {
      // result set empty
      res.status(200).json({
        message: "No games Found",
        games: filterResult,
      });
    } else {
      res.status(200).json({
        message: "Filter Successfull.",
        games: filterResult,
        hasMore: totalGames > loadedGames,
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
