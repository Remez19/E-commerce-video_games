import { useEffect } from "react";

import "./AddItemPage.css";
import Card from "../UI/UI_Utill/Card";
import useHttp from "../../hooks/use-http";
import Loading from "../UI/UI_Utill/Loading";
import GameItem from "../UI/Games_UI/GameItem";
import AddItemForm from "../UI/UI_Elements/AddItemForm";

function AddItemPage() {
  // const [isGameCreated, setIsGameCreated] = useState(false);

  const onItemAdded = () => {
    // Handle game creation
    // present a feed back - game created
  };
  const {
    error,
    isLoading,
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
    <main className="add-item-page__container">
      <h2>Add New Game To Store</h2>
      {/* {isGameCreated && <p color="white">Game Created</p>} */}
      {isLoading && <Loading width={"100%"} height={"100%"} />}
      {!isLoading && (
        <Card width={"60%"}>
          <GameItem gameData={""}></GameItem>
          <AddItemForm addItem={addItem} />
        </Card>
      )}
    </main>
  );
}

export default AddItemPage;
