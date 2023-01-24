import "./GameItem.css";
const GameItem = ({ gameData, onGameItemClick, myRef }) => {
  const onClickGameHandler = () => {
    onGameItemClick(gameData);
  };
  const onaAddToCartHandler = () => {
    console.log("add");
  };
  return (
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
        <button className="game_item__to-favorite" title="Add To Favorite" />
        <button
          title="Add To Cart"
          className="game_item__to-cart"
          onClick={onaAddToCartHandler}
        />
      </div>
    </div>
  );
};

export default GameItem;
