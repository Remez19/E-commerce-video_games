import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCartPlus, FaRegHeart, FaHeart } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";

import "./GameItemPage.css";
import { uiSliceActions } from "../../Store/ui";
import useHttp from "../../hooks/use-http";
import Loading from "../UI/UI_Utill/Loading";
import Rate from "../UI/UI_Utill/Rate";

function GameItemPage() {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const navigate = useNavigate();
  const dispatchAction = useDispatch();
  const [reqConfigCart] = useState({
    url: "http://localhost:8080/addToCart",
  });

  const [reqConfigFav] = useState({});
  const { state } = useLocation();
  const { game } = state;
  const [favoriteGame, setFavoriteGame] = useState(false);

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
        if (favGame === game._id) {
          exist = true;
          break;
        }
      }
    }
    setFavoriteGame(exist);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    dispatchAction(uiSliceActions.updateUserFavorites(favorites));
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
        { userEmail: loggedInUser.userEmail, itemId: game._id },
        "http://localhost:8080/removeItemFromFavorites"
      );
    } else {
      favItem(
        { userEmail: loggedInUser.userEmail, itemId: game._id },
        "http://localhost:8080/addToFavorites"
      );
    }
  };
  const onAddToCartHandler = () => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      addItemToCart({ userEmail: loggedInUser.userEmail, itemId: game._id });
    }
  };
  // If user is authenticated
  useEffect(() => {
    if (error) {
      if (error.response && error.response.status === 401) {
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
    } else {
      let favorites = JSON.parse(localStorage.getItem("favorites"));
      if (favorites) {
        for (const faveItem of favorites) {
          if (faveItem === game._id) {
            setFavoriteGame(true);
          }
        }
      }
      // setFavoriteGame(favorites.find(game._id));
    }
  }, [dispatchAction, error, errorFav, favoriteGame, game._id, navigate]);
  return (
    <>
      {!isLoading && !isLoadingFav ? (
        <main className="game-item__page-container">
          <h2>{game.title}</h2>
          <div className="game-item__page-data-container">
            <iframe
              className="game-item__page-container-video"
              width="853"
              height="480"
              src={`https://www.youtube.com/embed/${game.youtubeUrl}?enablejsapi=1&origin=http://localhost:3000/`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <Rate rating={game.rating.averageRating} gameId={game._id}></Rate>
            <div
              className="game_item_container__platforms"
              style={{ color: "#ffe283", margin: "0" }}
            >
              Platforms
              <ul className="game_item_container__platforms_list">
                {game.platforms.includes("PS") && (
                  <li
                    style={{
                      backgroundImage: `url(${require("../../images/Platforms/ps.png")})`,
                    }}
                  ></li>
                )}
                {game.platforms.includes("XBOX") && (
                  <li
                    style={{
                      backgroundImage: `url(${require("../../images/Platforms/xbox.png")})`,
                    }}
                  ></li>
                )}
                {game.platforms.includes("PC") && (
                  <li
                    style={{
                      backgroundImage: `url(${require("../../images/Platforms/pc.png")})`,
                    }}
                  ></li>
                )}
              </ul>
            </div>
            <p style={{ color: "#ffe283", margin: "0" }}>Description</p>
            <p
              className="game-item__page_description"
              style={{ textDecoration: "none", margin: "0" }}
            >
              {game.description}
            </p>
            {/* <p
              style={{ textDecoration: "none", color: "#ffe283", margin: "0" }}
            >
              {`Price: $${game.price}`}
            </p> */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                color: "#85bb65",
              }}
            >
              <GiPriceTag color="#85bb65" size={"1.5rem"} />
              {`${game.price}$`}
            </div>
            <div className="game-item__page_actions-container">
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
        </main>
      ) : (
        <Loading width={"100%"} height={"100%"} />
      )}
    </>
  );
}

export default GameItemPage;
