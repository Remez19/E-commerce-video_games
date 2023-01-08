import "./GameItem.css";
const GameItem = ({ gameData, onGameItemClick }) => {
  const onClickGameHandler = () => {
    onGameItemClick(gameData);
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
          <li
            style={{
              backgroundImage: `url(${require("../../../images/Platforms/ps.png")})`,
            }}
          ></li>
          <li
            style={{
              backgroundImage: `url(${require("../../../images/Platforms/xbox.png")})`,
            }}
          ></li>
          <li
            style={{
              backgroundImage: `url(${require("../../../images/Platforms/pc.png")})`,
            }}
          ></li>
        </ul>
      </div>
      <p className="game_item_container__price">{`Price:${gameData.price}`}</p>
      <div className="game_item_container__actions">
        <button>Youtube Trailer</button>
        <button>Add To Cart</button>
      </div>
    </div>
  );
};

export default GameItem;
