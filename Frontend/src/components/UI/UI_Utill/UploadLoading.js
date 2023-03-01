import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

import "./UploadLoading.css";
import Card from "./Card";

function UploadLoading({ progress, setIsAdding, newGame }) {
  //   const [isFinishUpload, setIsFinishUpload] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="upload-loading__container">
      <Card>
        <div className="upload-loading__data">
          <h4 style={{ color: "#6c757d" }}>
            {progress === 100 ? "New Game Created" : "Uploading New Game"}
          </h4>
          <ProgressBar
            max={100}
            now={progress}
            striped
            variant="success"
            label={`${progress}%`}
            animated
            style={{
              width: "75%",
              height: "2rem",
            }}
          />
          {progress === 100 && (
            <ButtonGroup>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                }}
              >
                Add another
              </Button>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => {
                  navigate("/game-item", {
                    state: { game: newGame, favorite: false },
                  });
                }}
              >
                See new game
              </Button>
            </ButtonGroup>
          )}
        </div>
      </Card>
    </div>
  );
}

export default UploadLoading;
