import "./DataContainer.css";
import GamePosterSlider from "./UI/Games_UI/GamePosterSlider";
import GameCatalog from "./UI/Games_UI/GameCatalog";
import appStore from "../Store/store";
import { useState, useEffect } from "react";
/*
Add data dynamically 
const Dummy_Data = [
  {
    name: "SpiderMan",
    img: "Something",
  },
];

*/

// const gamesData = [
//   {
//     title: "Morden Warfare 2",
//     url: require("../images/Games_Images/MW2.jpg"),
//     price: "59.99$",
//     description:
//       "Call of Duty: Modern Warfare II is a 2022 first-person shooter game developed by Infinity Ward and published by Activision. It is a sequel to the 2019 reboot, and serves as the nineteenth installment in the overall Call of Duty series.[2] It was released on October 28, 2022, for PlayStation 4 and PlayStation 5, Windows, and Xbox One and Xbox Series X/S.",
//   },
//   {
//     title: "Elden Ring",
//     url: require("../images/Games_Images/EldenRing.jpg"),
//     price: "59.99$",
//     description:
//       "Elden Ring[a] is a 2022 action role-playing game developed by FromSoftware and published by Bandai Namco Entertainment. It was directed by Hidetaka Miyazaki with worldbuilding provided by fantasy writer George R. R. Martin. The game was released for PlayStation 4, PlayStation 5, Windows, Xbox One, and Xbox Series X/S on February 25.",
//   },
//   {
//     title: "God Of War Ragnarok",
//     url: require("../images/Games_Images/gow.jpg"),
//     price: "59.99$",
//     description:
//       "God of War Ragnarök is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment. It was released worldwide on November 9, 2022, for the PlayStation 4 and PlayStation 5, marking the first cross-gen release in the God of War series. It is the ninth installment in the series, the ninth chronologically, and the sequel to 2018's God of War. Loosely based on Norse mythology, the game is set in ancient Scandinavia and features series protagonist Kratos and his teenage son Atreus. Concluding the Norse era of the series, the game covers Ragnarök, the eschatological event which is central to Norse mythology and was foretold to happen in the previous game after Kratos killed the Æsir god Baldur.",
//   },
//   {
//     title: "Hogwarts Legacy",
//     url: require("../images/Games_Images/HogwartsLegacy.jpg"),
//     price: "59.99$",
//     description:
//       "Hogwarts Legacy is an upcoming action role-playing game, developed by Avalanche Software and published by Warner Bros. Interactive Entertainment under its Portkey Games label. The game is set in the Wizarding World universe, based on the Harry Potter novels and film series including Fantastic Beasts. Hogwarts Legacy is scheduled to be released on February 10, 2023, for Windows, PlayStation 4, PlayStation 5, Xbox One, and Xbox Series X/S. The release date for Nintendo Switch will be revealed at a later date.",
//   },
//   {
//     title: "Red Dead Redemtion 2",
//     url: require("../images/Games_Images/rdr2.jpg"),
//     price: "59.99$",
//     description:
//       "Red Dead Redemption 2 is a 2018 action-adventure game developed and published by Rockstar Games. The game is the third entry in the Red Dead series and a prequel to the 2010 game Red Dead Redemption. The story is set in 1899 and follows the exploits of outlaw Arthur Morgan, a member of the Van der Linde gang, in a fictionalized representation of the Western, Midwestern, and Southern United States. Arthur must deal with the decline of the Wild West whilst attempting to survive against government forces, rival gangs, and other adversaries. The game's epilogue follows fellow gang member John Marston, the protagonist of Red Dead Redemption.",
//   },
// ];

const DataContainer = () => {
  const [gamesList, setGamesList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getGames = async () => {
    let resData;
    try {
      const res = await fetch("http://localhost:8080/", { method: "POST" });
      if (res.status !== 200) {
        throw new Error("Response not ok!");
      }
      resData = await res.json();
      setGamesList(resData.games);
    } catch (err) {
      // Handle error !
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    setIsLoading(true);
    getGames();
  }, []);
  return (
    <main className="main_data_container">
      {!isLoading ? <GamePosterSlider GameList={gamesList} /> : <p>Loading!</p>}
      {/* {!isLoading ? <GamePosterSlider GameList={gamesList} /> : <p>Loading</p>} */}
      {!isLoading ? <GameCatalog GameList={gamesList} /> : <p>Loading!</p>}
    </main>
  );
};

export default DataContainer;
