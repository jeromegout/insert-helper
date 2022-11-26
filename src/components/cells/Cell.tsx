import { Cell as CellType, RingType } from "../../types/Cell";
import E_Cell from "./E_Cell";
import H_Cell from "./H_Cell";
import V_Cell from "./V_Cell";
import W_Cell from "./W_Cell";
import "./Cell.css";

export interface CellProps {
  cell: CellType;
  size: string;
  onCellClicked: () => void;
}

const Cell = ({ cell, size, onCellClicked }: CellProps) => {
  const getClassName = (ring: RingType) => {
    if (ring === RingType.NONE) return "cell";
    if (ring === RingType.PLAYER1) return "cell player one";
    if (ring === RingType.PLAYER2) return "cell player two";
    if (ring === RingType.HIGHLIGHTED) return "cell highlighted";
    if (ring === RingType.WINNER1) return "cell player winner one";
    if (ring === RingType.WINNER2) return "cell player winner two";
  };

  const handleClickCell = () => {
    if (cell.ring === RingType.HIGHLIGHTED) onCellClicked();
  };

  switch (cell.kind) {
    case "e":
      return (
        <div className={getClassName(cell.ring)} style={{ height: size }} onClick={handleClickCell}>
          <E_Cell w={size} />
        </div>
      );
    case "w":
      return (
        <div className={getClassName(cell.ring)} style={{ height: size }} onClick={handleClickCell}>
          <W_Cell w={size} />
        </div>
      );
    case "h":
      return (
        <div className={getClassName(cell.ring)} style={{ height: size }} onClick={handleClickCell}>
          <H_Cell w={size} />
        </div>
      );
    case "v":
      return (
        <div className={getClassName(cell.ring)} style={{ height: size }} onClick={handleClickCell}>
          <V_Cell w={size} />
        </div>
      );
  }
};

export default Cell;
