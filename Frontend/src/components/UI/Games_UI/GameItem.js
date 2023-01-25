import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { uiSliceActions } from "../../../Store/ui";
import "./GameItem.css";
import useHttp from "../../../hooks/use-http";
import Loading from "../UI_Utill/Loading";

const GameItem = ({ gameData, onGameItemClick, myRef, gameId }) => {
  const loggedInUser = useSelector((state) => state.ui.loggedInUser);
  const dispatchAction = useDispatch();
  const navigate = useNavigate();
  const [reqConfig] = useState({
    url: "http://localhost:8080/addToCart",
  });

  const onAddToCartFinish = (resData) => {
    const { newCart } = resData;
    localStorage.setItem("cart", JSON.stringify(resData.newCart));
    dispatchAction(uiSliceActions.updateUserCart(newCart));
  };
  const onClickGameHandler = () => {
    onGameItemClick(gameData);
  };

  const {
    sendRequest: addToItemCart,
    isLoading,
    error,
  } = useHttp(reqConfig, onAddToCartFinish);
  const onAddToCartHandler = () => {
    if (!loggedInUser) {
      navigate("/login");
    } else {
      addToItemCart({ userId: loggedInUser.userId, itemId: gameId });
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
  });
  return (
    <>
      {!isLoading ? (
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
              className="game_item__to-favorite"
              title="Add To Favorite"
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
