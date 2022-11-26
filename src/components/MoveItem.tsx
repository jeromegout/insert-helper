import Move from "../types/Move";
import "./MoveItem.css";

interface MoveItemProps {
  item: Move;
  index: number;
}

const MoveItem = ({ item, index }: MoveItemProps) => {
  const formatPosition = (index: number): string => {
    const i = Math.floor(index / 6);
    const j = index % 6;
    return `(${j + 1}, ${i + 1})`;
  };

  return (
    <div>
      <span style={{ marginRight: "10px" }}>{index + 1}.</span>
      <span className={item.firstPlayer ? "move-one" : "move-two"}>
        {item.firstPlayer} {formatPosition(item.position)}
      </span>
    </div>
  );
};

export default MoveItem;
