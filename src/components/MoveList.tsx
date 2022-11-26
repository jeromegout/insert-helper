import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Move from "../types/Move";
import MoveItem from "./MoveItem";

interface MoveListProps {
  moves: Move[];
  onBackClick: () => void;
}

const MoveList = ({ moves, onBackClick }: MoveListProps) => {
  const items = () => {
    const offset = moves.length >= 5 ? moves.length - 5 : 0;
    return moves.slice(-5).map((m, i) => <MoveItem key={i} item={m} index={i + offset} />);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
        <h3>Moves</h3>
        <button style={{ cursor: "pointer" }} disabled={moves.length === 0} onClick={onBackClick}>
          <FontAwesomeIcon icon={faRotateLeft} />
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>{items()}</div>
    </div>
  );
};

export default MoveList;
