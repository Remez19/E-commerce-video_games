import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { uiSliceActions } from "../../../Store/ui";
import "./GameItem.css";
import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";
// import Rate from "../UI_Utill/Rate";

const GameItem = ({ gameData, onGameItemClick, myRef, gameId, rate }) => {
  const [favoriteGame, setFavoriteGame] = useState(false);
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
          {/* <div style={{ display: "flex", gap: "0.3rem" }}>
            {[...Array(5).keys()].map((val) => {
              return (
                <>
                  <Rate color={"white"} size={"10px"} key={val + 1} />
                  <Rate color={"#FFD700"} size={"5x"} key={val} />
                </>
              );
            })}
          </div> */}
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
                backgroundImage: favoriteGame
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
        <Loading width={"100%"} height={"100%"} />
      )}
    </>
  );
};

export default GameItem;
