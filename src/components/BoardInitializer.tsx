import { useState } from "react";
import BoardPart, { PartKind } from "../types/BoardPart";
import UIPart from "./BoardPart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Game from "../types/Game";

const BoardInitializer = () => {
  const [TL, setTL] = useState<BoardPart>(new BoardPart("C"));
  const [TR, setTR] = useState<BoardPart>(new BoardPart("H"));
  const [BL, setBL] = useState<BoardPart>(new BoardPart("S"));
  const [BR, setBR] = useState<BoardPart>(new BoardPart("Y"));
  const navigate = useNavigate();
  const [games, setGames] = useLocalStorage<Game[]>([], "games");

  const getKind = (s: string): PartKind => {
    if (!s || s.length === 0) return "C";
    switch (s.toUpperCase()[0]) {
      case "C":
        return "C";
      case "H":
        return "H";
      case "S":
        return "S";
      case "Y":
        return "Y";
      default:
        return "C";
    }
  };

  const turnLeft = (current: number): number => (current + 90) % 360;
  const turnRight = (current: number): number => (current === 0 ? 270 : current - 90);

  const selectorStyle = { display: "flex", alignItems: "center", columnGap: "4px" };

  const computeSlugIndex = (games: Game[]) => {
    let index = 0;
    games.forEach((g) => {
      const parts = g.slug.split("-");
      if (parts.length === 2) {
        if (index < +parts[1]) index = +parts[1];
      }
    });
    return ++index;
  };

  const computeSlug = () => {
    let slug = `${TL.toString()}${TR.toString()}${BL.toString()}${BR.toString()}`;
    const existingSameSlug = games.filter((game) => game.slug.startsWith(slug));
    if (existingSameSlug.length > 0) {
      slug += `-${computeSlugIndex(existingSameSlug)}`;
    }
    return slug;
  };

  const handleValidate = () => {
    const slug = computeSlug();
    games.unshift(new Game(slug));
    setGames([...games]);
    setTimeout(() => {
      navigate(`/games/${slug}`);
    }, 100);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        marginTop: "30px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
        <div style={selectorStyle}>
          <select
            name="kind"
            value={TL.kind}
            onChange={(e) => setTL(new BoardPart(getKind(e.target.value), TL.orientation))}
          >
            <option value="C">C</option>
            <option value="H">H</option>
            <option value="S">S</option>
            <option value="Y">Y</option>
          </select>
          <button className="btn-icon" onClick={(e) => setTL((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button className="btn-icon" onClick={(e) => setTL((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
        <div style={selectorStyle}>
          <select
            name="kind"
            value={TR.kind}
            onChange={(e) => setTR(new BoardPart(getKind(e.target.value), TR.orientation))}
          >
            <option value="C">C</option>
            <option value="H">H</option>
            <option value="S">S</option>
            <option value="Y">Y</option>
          </select>
          <button className="btn-icon" onClick={(e) => setTR((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button className="btn-icon" onClick={(e) => setTR((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
        <UIPart part={TL} size="50px" />
        <UIPart part={TR} size="50px" />
        <UIPart part={BL} size="50px" />
        <UIPart part={BR} size="50px" />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%" }}>
        <div style={selectorStyle}>
          <select
            name="kind"
            value={BL.kind}
            onChange={(e) => setBL(new BoardPart(getKind(e.target.value), BL.orientation))}
          >
            <option value="C">C</option>
            <option value="H">H</option>
            <option value="S">S</option>
            <option value="Y">Y</option>
          </select>
          <button className="btn-icon" onClick={(e) => setBL((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button className="btn-icon" onClick={(e) => setBL((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
        <div style={selectorStyle}>
          <select
            name="kind"
            value={BR.kind}
            onChange={(e) => setBR(new BoardPart(getKind(e.target.value), BR.orientation))}
          >
            <option value="C">C</option>
            <option value="H">H</option>
            <option value="S">S</option>
            <option value="Y">Y</option>
          </select>
          <button className="btn-icon" onClick={(e) => setBR((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button className="btn-icon" onClick={(e) => setBR((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
      </div>
      <button
        style={{ marginTop: "20px", padding: "0.4rem 0.9rem", border: "none", borderRadius: "5px", cursor: "pointer" }}
        onClick={handleValidate}
      >
        Play with this board
      </button>
    </div>
  );
};

export default BoardInitializer;
