import { useEffect, useState } from "react";

import "./AddItemPage.css";
import Card from "../UI/UI_Utill/Card";
import useHttp from "../../hooks/use-http";
import UploadLoading from "../UI/UI_Utill/UploadLoading";
import GameItemEditView from "../UI/UI_Elements/GameItemEditView";
import AddItemForm from "../UI/UI_Elements/AddItemForm";

function AddItemPage() {
  const [newGame, setNewGame] = useState();
  const [isAdding, setIsAdding] = useState(false);
  const [gameData, setGameData] = useState({
    title: "No-Name",
    platforms: [],
    price: 0,
    backgroundImage: `url(${require("../../images/UI_Images/noImage.png")})`,
  });
  const onChangeGameView = (gameData) => {
    setGameData((prevState) => {
      return { ...prevState, ...gameData };
    });
  };

  const onItemAdded = (resData) => {
    setGameData({
      title: "No-Name",
      platforms: [],
      price: 0,
      backgroundImage: `url(${require("../../images/UI_Images/noImage.png")})`,
    });
    setNewGame(resData.newGame);
  };
  const {
    progress,
    error,
    sendRequest: addItem,
  } = useHttp(
    {
      url: "http://localhost:8080/admin/add-item/",
      headers: { "Content-Type": "multipart/form-data" },
    },
    onItemAdded,
    false
  );

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);
  return (
    <main
      className="add-item-page__container"
      style={{ minHeight: isAdding ? "100%" : "80rem" }}
    >
      {!isAdding && <h2>Add New Game To Store</h2>}
      {isAdding && (
        <UploadLoading
          progress={progress}
          setIsAdding={setIsAdding}
          newGame={newGame}
        />
      )}
      <div className="add-item-page__data">
        {!isAdding && (
          <Card>
            <AddItemForm
              addItem={addItem}
              setIsAdding={setIsAdding}
              onCahngeInput={onChangeGameView}
            />
          </Card>
        )}
        {!isAdding && <GameItemEditView gameData={gameData}></GameItemEditView>}
      </div>
    </main>
  );
}

export default AddItemPage;
