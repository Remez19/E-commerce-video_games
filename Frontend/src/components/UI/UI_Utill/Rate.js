import { FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useHttp from "../../../hooks/use-http";
import Loading from "./Loading";
import "./Rate.css";

function Rate({ rating, gameId }) {
  const [totalRating, setTotalRating] = useState(rating);
  const navigate = useNavigate();
  const [starsColorsBool, setStarsColorsBool] = useState(
    [...Array(5).keys()].map((val) => {
      return val < totalRating ? 1 : 0;
    })
  );

  const onRateFinish = (resData) => {
    setTotalRating(resData.newRating);
    setStarsColorsBool(
      [...Array(5).keys()].map((val) => {
        return val < resData.newRating ? 1 : 0;
      })
    );
  };
  const {
    error,
    isLoading,
    sendRequest: rateGame,
  } = useHttp(
    {
      url: "http://localhost:8080/rateGame",
    },
    onRateFinish
  );
  const onClickRateHandler = (e) => {
    let rateVal = e.target.id
      ? e.target.id
      : e.target.parentNode.getAttribute("id");
    rateVal = Number(rateVal) + 1;
    rateGame({
      rateVal: rateVal,
      userEmail: localStorage.getItem("userEmail"),
      gameId: gameId,
    });
  };
  useEffect(() => {
    if (error) {
      if (error.statusCode === 401) {
        navigate("/login");
      } else {
        throw error;
      }
    }
  }, [error, navigate, rating]);
  return (
    <>
      {!isLoading && (
        <div
          className="rate-container"
          onMouseLeave={(e) => {
            setStarsColorsBool((prevState) => {
              return [...Array(5).keys()].map((val) => {
                return val < totalRating ? 1 : 0;
              });
            });
          }}
        >
          {[...Array(5).keys()].map((val) => {
            return (
              <FaStar
                onMouseEnter={(e) => {
                  const id = e.target.id
                    ? e.target.id
                    : e.target.parentNode.getAttribute("id");
                  setStarsColorsBool((prevState) => {
                    return [
                      ...prevState.map((val, i) => {
                        return i <= id ? 1 : 0;
                      }),
                    ];
                  });
                }}
                onClick={onClickRateHandler}
                style={{ cursor: "pointer" }}
                color={starsColorsBool[val] === 1 ? "#FFD700" : "#8d8d8d"}
                width={"2.5rem"}
                stroke={"#434343"}
                strokeWidth={"3rem"}
                key={val}
                id={val}
              ></FaStar>
            );
          })}
        </div>
      )}
      {isLoading && <Loading width={"100%"} height={"100%"} />}
    </>
  );
}

export default Rate;
