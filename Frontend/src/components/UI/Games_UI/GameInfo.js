import "./GameInfo.css";
import Backdrop from "../UI_Utill/Backdrop";
const GameInfo = ({ gameData, onBackClick }) => {
  return (
    <div
      className="game_info__container"
      onClick={(event) => {
        event.stopPropagation();
      }}
    >
      <button
        className="game_info__container__back"
        onClick={onBackClick}
      ></button>
      <p>{gameData.title}</p>
      <div
        className="game_info__container_image"
        style={{
          backgroundImage: `url(${gameData.url})`,
        }}
      ></div>
      {/* Can add rating with starts like  */}
      <p>Description</p>
      <textarea
        className="game_info__container_description"
        defaultValue={gameData.description}
      ></textarea>
      <div>
        <button>Add To Cart</button>
        <button>Favorite</button>
      </div>
    </div>
  );
};
export default GameInfo;
