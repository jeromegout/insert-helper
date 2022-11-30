import useLocalStorage from "../hooks/useLocalStorage";
import { Game } from "../types/Game";
import { SimpleTable } from "react-simple-table2";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { DateTime } from "luxon";
import { SortData } from "react-simple-table2/dist/types";

const Games = () => {
  const [games, setGames] = useLocalStorage<Game[]>([], "games");
  const navigate = useNavigate();

  const handleNewGame = () => {
    navigate("/new");
  };

  const deleteGame = (game: Game) => {
    const others = games.filter((g) => g !== game);
    setGames([...others]);
    window.localStorage.removeItem(`moves-${game.slug}`);
  };

  const playGame = (game: Game) => {
    navigate(`games/${game.slug}`);
  };

  const actions = (game: Game) => (
    <div className="actions" style={{ display: "flex", gap: "20px", alignItems: "center", justifyContent: "flex-end" }}>
      <FontAwesomeIcon style={{ height: "20px" }} onClick={(e) => playGame(game)} icon={faCirclePlay} />
      <FontAwesomeIcon style={{ height: "20px" }} icon={faTrash} onClick={(e) => deleteGame(game)} />
    </div>
  );

  const gameDate = (game: Game) => DateTime.fromISO(game.createdAt).setLocale("fr").toRelative();

  const gameMoveNumber = (game: Game) => {
    const moves = window.localStorage.getItem(`moves-${game.slug}`);
    return moves ? JSON.parse(moves).length : 0;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Games</h1>
      <button onClick={handleNewGame}>New Game</button>
      <SimpleTable
        data={games}
        cols={[
          ["createAt", "Created", gameDate],
          ["slug", "Slug", "slug"],
          ["moves", "Moves", gameMoveNumber, { tdAttrs: { style: { textAlign: "center" } } }],
          ["actions", "Actions", actions],
        ]}
        breakpoint="sm"
        useCards
      />
    </div>
  );
};

export default Games;
