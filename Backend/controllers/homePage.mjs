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
    // Pageniation needed
    // db.users.find(name: new RegExp('^' + search + '$')) //For exact search, case
    // console.log(`title: { $regex: /^${req.params.keyWords}/ }`);
    // console.log(`"^${req.params.keyWords}"`);
    // const query = { title: `/^${req.params.keyWords}/` };
    // console.log(query);
    const gamesList = await gameModel.find({
      title: new RegExp(`^${req.params.keyWords}`),
    });
    console.log(gamesList);
    res.status(200).json({
      message: "Search Successfull.",
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
// { <field>: { $regex: /pattern/, $options: '<options>' } }
// { <field>: { $regex: 'pattern', $options: '<options>' } }
// { <field>: { $regex: /pattern/<options> } }
// db.products.find( { sku: { $regex: /^ABC/i } } )
