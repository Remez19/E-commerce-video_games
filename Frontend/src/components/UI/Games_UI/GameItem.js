import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { uiSliceActions } from "../../../Store/ui";
import "./GameItem.css";
import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";

const GameItem = ({ gameData, onGameItemClick, myRef, gameId, favorite }) => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const dispatchAction = useDispatch();
  const navigate = useNavigate();
  const [reqConfigCart] = useState({
    url: "http://localhost:8080/addToCart",
  });

  const [reqConfigFav] = useState({});

  const onAddToCartFinish = (resData) => {
    const { newCart } = resData;
    localStorage.setItem("cart", JSON.stringify(resData.newCart));
    dispatchAction(uiSliceActions.updateUserCart(newCart));
  };

  const onAddToFavoritesFinish = (resData) => {
    const { favorites } = resData;
    localStorage.removeItem("favorites");
    localStorage.setItem("favorites", JSON.stringify(favorites));
    dispatchAction(uiSliceActions.updateUserFavorites(favorites));
  };

  const onClickGameHandler = () => {
    onGameItemClick(gameData, favorite);
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
    } else if (favorite) {
      favItem(
        { userEmail: loggedInUser.userEmail, itemId: gameId },
        "http://localhost:8080/removeItemFromFavorites"
      );
    } else {
      favItem(
        { userEmail: loggedInUser.userEmail, itemId: gameId },
        "http://localhost:8080/addToFavorites"
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
      if (errorFav.status === 401) {
        localStorage.clear();
        dispatchAction(uiSliceActions.setLoggedInUser(undefined));
        navigate("/login");
      } else {
        throw error || errorFav;
      }
    }
  });
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
          <p className="game_item_container__price">{`Price:${gameData.price}`}</p>
          <div
            className="game_item_container__actions"
            ref={myRef}
            id={myRef && "last"}
          >
            <button
              style={{
                backgroundImage: favorite
                  ? `url(${require("../../../images/UI_Images/favorite.png")})`
                  : `url(${require("../../../images/UI_Images/add_to_favorite.png")})`,
              }}
              className="game_item__to-favorite"
              title="Add To Favorite"
              onClick={onAddToFavoritesHandler}
            />
            <button
              title="Add To Cart"
              className="game_item__to-cart"
              onClick={onAddToCartHandler}
            />
          </div>
        </div>
      ) : (
        <Loading width={"100vw"} height={"100vh"} />
      )}
    </>
  );
};

export default GameItem;
