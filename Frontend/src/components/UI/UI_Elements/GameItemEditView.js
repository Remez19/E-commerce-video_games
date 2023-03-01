import { FaCartPlus, FaRegHeart } from "react-icons/fa";
import { GiPriceTag } from "react-icons/gi";
import { FaStar } from "react-icons/fa";

import "../UI_Utill/Rate.css";
import "../Games_UI/GameItem.css";
import Card from "../UI_Utill/Card";

function GameItemEditView({ gameData }) {
  return (
    <Card>
      <div
        className="game_item_container"
        style={{ backgroundColor: "black", pointerEvents: "none" }}
      >
        <p className="game_item_container__title">{gameData.title}</p>
        <div
          className="game_item_container__image"
          style={{
            backgroundImage: gameData.backgroundImage
              ? gameData.backgroundImage
              : `url(${gameData.imageUrl})`,
          }}
        ></div>

        <div className="rate-container">
          {[...Array(5).keys()].map((val) => {
            return (
              <FaStar
                style={{ cursor: "pointer" }}
                color={val === 0 ? "#FFD700" : "#8d8d8d"}
                width={"2.5rem"}
                stroke={"#434343"}
                strokeWidth={"3rem"}
                key={val}
                id={val}
              ></FaStar>
            );
          })}
        </div>

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
        <div className="game_item_container__actions">
          <FaRegHeart
            title="Add To Favorite"
            size={"2rem"}
            color={"#ff7474"}
            className="game_item__to-favorite"
          />
          <FaCartPlus
            title="Add To Cart"
            className="game_item__to-cart"
            size={"2rem"}
            color={"#ffe283"}
          />
        </div>
      </div>
    </Card>
  );
}

export default GameItemEditView;
