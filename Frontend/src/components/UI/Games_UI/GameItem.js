import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaRegHeart, FaHeart } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";

import { uiSliceActions } from "../../../Store/ui";
import "./GameItem.css";
import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
import Rate from "../UI_Utill/Rate";

const GameItem = ({ gameData, onGameItemClick, myRef, gameId }) => {
  const [favoriteGame, setFavoriteGame] = useState(false);
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const dispatchAction = useDispatch();
  const navigate = useNavigate();
  const [reqConfigCart] = useState({
    url: `${process.env.REACT_APP_Backend}/addToCart`,
  });

  const [reqConfigFav] = useState({});

  const onAddToCartFinish = (resData) => {
    const { newCart } = resData;
    localStorage.setItem("cart", JSON.stringify(resData.newCart));
    dispatchAction(uiSliceActions.updateUserCart(newCart));
  };

  const onAddToFavoritesFinish = (resData) => {
    const { favorites } = resData;

    let exist = false;
    if (favorites.length > 0) {
      for (const favGame of favorites) {
        if (favGame === gameData._id) {
          exist = true;
          break;
        }
      }
    }
    setFavoriteGame(exist);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    dispatchAction(uiSliceActions.updateUserFavorites(favorites));
  };

  const onClickGameHandler = () => {
    onGameItemClick(gameData, favoriteGame);
  };

  const {
    sendRequest: addItemToCart,
    isLoading,
    error,
  } = useHttp(reqConfigCart, onAddToCartFinish);

  const {
    isLoading: isLoadingFav,
    error: errorFav,
    sendRequest: favItem,
  } = useHttp(reqConfigFav, onAddToFavoritesFinish);

  const onAddToFavoritesHandler = () => {
    if (!loggedInUser) {
      navigate("/login");
    } else if (favoriteGame) {
      favItem(
        { userEmail: loggedInUser.userEmail, itemId: gameId },
        `${process.env.REACT_APP_Backend}/removeItemFromFavorites`
      );
    } else {
      favItem(
        { userEmail: loggedInUser.userEmail, itemId: gameId },
        `${process.env.REACT_APP_Backend}/addToFavorites`
      );
    }
  };
  const onAddToCartHandler = () => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      addItemToCart({ userEmail: loggedInUser.userEmail, itemId: gameId });
    }
  };
  // If user is authenticated
  useEffect(() => {
    if (error) {
      if (error.status === 401) {
        localStorage.clear();
        dispatchAction(uiSliceActions.setLoggedInUser(undefined));
        navigate("/login");
      } else {
        throw error;
      }
    }
    if (errorFav) {
      // Error in favorite request.
      if (errorFav.status === 401) {
        localStorage.clear();
        dispatchAction(uiSliceActions.setLoggedInUser(undefined));
        navigate("/login");
      } else {
        throw error || errorFav;
      }
    }
    if (loggedInUser) {
      let favorites = JSON.parse(localStorage.getItem("favorites"));

      for (const favGame of favorites) {
        if (favGame === gameData._id) {
          setFavoriteGame(true);
        }
      }
    }
  }, [dispatchAction, error, errorFav, gameData._id, loggedInUser, navigate]);
  return (
    <>
      {!isLoading && !isLoadingFav ? (
        <div className="game_item_container">
          <p className="game_item_container__title">{gameData.title}</p>
          <div
            onClick={onClickGameHandler}
            className="game_item_container__image"
            style={{ backgroundImage: `url(${gameData.imageUrl})` }}
          ></div>

          <Rate rating={gameData.rating.averageRating} gameId={gameId} />

          <div className="game_item_container__platforms">
            Platforms
            <ul className="game_item_container__platforms_list">
              {gameData.platforms.includes("PS") && (
                <li
                  style={{
                    backgroundImage: `url(${require("../../../images/Platforms/ps.png")})`,
                  }}
                ></li>
              )}
              {gameData.platforms.includes("XBOX") && (
                <li
                  style={{
                    backgroundImage: `url(${require("../../../images/Platforms/xbox.png")})`,
                  }}
                ></li>
              )}
              {gameData.platforms.includes("PC") && (
                <li
                  style={{
                    backgroundImage: `url(${require("../../../images/Platforms/pc.png")})`,
                  }}
                ></li>
              )}
            </ul>
          </div>
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              color: "#85bb65",
            }}
          >
            <GiPriceTag color="#85bb65" size={"1.5rem"} />
            {`${gameData.price}$`}
          </div>
          <div
            className="game_item_container__actions"
            ref={myRef}
            id={myRef && "last"}
          >
            {favoriteGame ? (
              <FaHeart
                title="Remove From Favorite"
                onClick={onAddToFavoritesHandler}
                size={"2rem"}
                color={"#ff7474"}
                className="game_item__to-favorite"
              />
            ) : (
              <FaRegHeart
                title="Add To Favorite"
                size={"2rem"}
                color={"#ff7474"}
                className="game_item__to-favorite"
                onClick={onAddToFavoritesHandler}
              />
            )}
            <FaCartPlus
              title="Add To Cart"
              className="game_item__to-cart"
              size={"2rem"}
              color={"#ffe283"}
              onClick={onAddToCartHandler}
            />
          </div>
        </div>
      ) : (
        <Loading width={"100%"} height={"100%"} />
      )}
    </>
  );
};

export default GameItem;
