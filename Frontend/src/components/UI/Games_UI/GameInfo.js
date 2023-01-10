import "./GameInfo.css";

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
      <iframe
        className="game_info__container_image"
        width="853"
        height="480"
        src={`${gameData.youtubeUrl}?enablejsapi=1&origin=http://localhost:3000/`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />

      {/* Can add rating with starts like  */}
      <p style={{ textDecoration: "underline" }}>Description</p>
      <p className="game_info__container_description">{gameData.description}</p>
      <div className="game_info__container__actions">
        <button>Add To Cart</button>
        <button>Favorite</button>
      </div>
    </div>
  );
};
export default GameInfo;
