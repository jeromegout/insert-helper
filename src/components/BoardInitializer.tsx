import { useState } from "react";
import BoardPart, { PartKind } from "../types/BoardPart";
import UIPart from "./BoardPart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const BoardInitializer = () => {
  const [TL, setTL] = useState<BoardPart>(new BoardPart("C"));
  const [TR, setTR] = useState<BoardPart>(new BoardPart("H"));
  const [BL, setBL] = useState<BoardPart>(new BoardPart("S"));
  const [BR, setBR] = useState<BoardPart>(new BoardPart("Y"));
  const navigate = useNavigate();

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

  const selectorStyle = { display: "flex", alignItems: "center" };

  const handleValidate = () => {
    navigate(`/game/${TL.toString()}${TR.toString()}${BL.toString()}${BR.toString()}`);
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "20px" }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
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
          <button onClick={(e) => setTL((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button onClick={(e) => setTL((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
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
          <button onClick={(e) => setTR((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button onClick={(e) => setTR((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5px" }}>
        <UIPart part={TL} size="40px" />
        <UIPart part={TR} size="40px" />
        <UIPart part={BL} size="40px" />
        <UIPart part={BR} size="40px" />
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-evenly", width: "100%" }}>
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
          <button onClick={(e) => setBL((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button onClick={(e) => setBL((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
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
          <button onClick={(e) => setBR((p) => new BoardPart(p.kind, turnLeft(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateLeft} />
          </button>
          <button onClick={(e) => setBR((p) => new BoardPart(p.kind, turnRight(p.orientation)))}>
            <FontAwesomeIcon icon={faRotateRight} />
          </button>
        </div>
      </div>
      <button style={{ marginTop: "20px" }} onClick={handleValidate}>
        Play with this board
      </button>
    </div>
  );
};

export default BoardInitializer;
