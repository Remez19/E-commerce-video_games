/**
 * Can pick better codes for the status response
 */
import { gameModel } from "../models/game.mjs";
import { userModel } from "../models/user.mjs";

const GAMES_PER_PAGE = 12;

export const getHomePage = async (req, res, next) => {
  // Check for errors before anything if needed!
  const pageNumber = req.body.pageNumber;

  try {
    const skip = (pageNumber - 1) * GAMES_PER_PAGE;
    const totalGames = await gameModel.find().countDocuments();
    const gamesList = await gameModel.find().skip(skip).limit(GAMES_PER_PAGE);
    const loadedGames = pageNumber * GAMES_PER_PAGE;
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

export const addItemToCart = async (req, res, next) => {
  const { itemId, userEmail } = req.body;
  try {
    const user = await userModel
      .findOne({ email: userEmail })
      .populate("cart.items.productData");
    if (!user) {
      throw new Error("Something went wrong!");
    }
    const itemIndex = user.cart.items.findIndex((cartItem) => {
      return cartItem.productData._id.toString() === itemId.toString();
    });
    if (itemIndex >= 0) {
      user.cart.items[itemIndex].quantity += 1;
      user.cart.totalPrice += user.cart.items[itemIndex].productData.price;
      await user.save();
      res
        .status(201)
        .json({ message: "Item added to cart.", newCart: user.cart });
    } else {
      const itemToAdd = await gameModel.findById(itemId);
      if (!itemToAdd) {
        throw new Error("Something went wrong!");
      }
      user.cart.items.push({ productData: itemToAdd, quantity: 1 });
      user.cart.totalPrice += itemToAdd.price;
      await user.save();
      res
        .status(201)
        .json({ message: "Item added to cart.", newCart: user.cart });
    }
  } catch (err) {
    if (!err.statusCode) {
      // Server error
      err.statusCode = 500;
    }
    next(err);
  }
};

export const addItemToFavorites = async (req, res, next) => {
  try {
    const { itemId, userEmail } = req.body;

    const user = await userModel.findOne({ email: userEmail });
    const itemToAdd = await gameModel.findById(itemId);
    if (!user || !itemToAdd) {
      throw new Error("Failed to add to favorite");
    }
    user.favorites.push(itemToAdd);
    await user.save();
    if (user.favorites.length === 1) {
      res.status(201).json({
        message: "Item added to favorites.",
        favorites: [user.favorites[0]._id],
      });
    } else {
      let favorites = user.favorites.map((favItem) => {
        return favItem._id.toString();
      });
      res.status(201).json({
        message: "Item added to favorites.",
        favorites: favorites,
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

export const removeItemFromFavorites = async (req, res, next) => {
  try {
    const { itemId, userEmail } = req.body;
    const user = await userModel
      .findOne({ email: userEmail })
      .populate("favorites");
    if (!user) {
      throw new Error("Failed to add to favorite");
    }
    user.favorites = [
      ...user.favorites.filter((favItem) => {
        return favItem._id.toString() !== itemId;
      }),
    ];
    await user.save();
    if (user.favorites.length === 1) {
      res.status(201).json({
        message: "Item unfavorite.",
        favorites: [user.favorites[0]._id],
      });
    } else {
      let favorites = user.favorites.map((favItem) => {
        return favItem._id.toString();
      });
      res.status(201).json({
        message: "Item unfavorite.",
        favorites: favorites,
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

export const rateGame = async (req, res, next) => {
  try {
    const { gameId, userEmail, rateVal } = req.body;
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
      throw new Error("Something Went Wrong!");
    }
    const game = await gameModel.findById(gameId);
    let oldRate = 0;
    if (game.rating.usersRate[user._id.toString()] !== undefined) {
      // User already rate this game
      oldRate = game.rating.usersRate[user._id.toString()];
    }
    game.rating.usersRate[user._id.toString()] = rateVal;

    game.rating.totalRating += rateVal - oldRate;
    game.rating.averageRating = Math.round(
      game.rating.totalRating / Object.keys(game.rating.usersRate).length
    );
    game.rating = {
      ...game.rating,
    };
    await game.save();
    res.status(201).json({ newRating: game.rating.averageRating });
  } catch (err) {
    if (!err.statusCode) {
      // Server error
      err.statusCode = 500;
    }
    next(err);
  }
};
