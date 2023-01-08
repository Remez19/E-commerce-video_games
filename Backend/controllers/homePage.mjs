import { gameModel } from "../models/game.mjs";

export const getHomePage = async (req, res, next) => {
  // Check for errors before anything if needed!

  try {
    // Pageniation needed
    const gamesList = await gameModel.find();
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
    if (req.params.keyWords) {
      const gamesList = await gameModel.find({
        title: new RegExp(`^${req.params.keyWords}`),
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
// { <field>: { $regex: /pattern/, $options: '<options>' } }
// { <field>: { $regex: 'pattern', $options: '<options>' } }
// { <field>: { $regex: /pattern/<options> } }
// db.products.find( { sku: { $regex: /^ABC/i } } )
