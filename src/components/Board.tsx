import { useEffect, useState } from "react";
import BoardParts from "../types/BoardParts";
import Cell from "./cells/Cell";
import { Cell as CellType, CellKind, RingType } from "../types/Cell";
import Move from "../types/Move";
import MoveList from "./MoveList";
import { useParams } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";

const Board = () => {
  const [cells, setCells] = useState<CellType[]>([]);
  const [isPlayerOne, setIsPlayerOne] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const { slug } = useParams();
  const [moves, setMoves] = useLocalStorage<Move[]>([], `moves-${slug}`);

  useEffect(() => {
    if (slug) {
      const parts = new BoardParts(slug);
      const newCells = parts.toCells();
      if (moves.length > 0) {
        newCells.forEach((c) => c.clean());
        moves.forEach((move) => {
          newCells[move.position].setRing(move.firstPlayer ? RingType.PLAYER1 : RingType.PLAYER2);
          move.inserts.forEach((index) => {
            newCells[index].setRing(move.firstPlayer ? RingType.PLAYER1 : RingType.PLAYER2);
          });
        });
        setIsPlayerOne(moves[moves.length - 1].firstPlayer); // the player will be switched in the next useEffect
        setMoves([...moves]);
      }
      setCells(newCells);
    }
  }, []);

  useEffect(() => {
    if (cells.length === 0) return;
    //- check if there is a winner
    if (checkWinner()) {
      setGameOver(true);
    } else {
      computeNextPossibleMoves();
      //- change player
      setIsPlayerOne((prev) => !prev);
    }
  }, [moves]);

  const getHorizontalNeighborsIndices = (index: number): number[] => {
    const first = index - (index % 6);
    const res = [];
    for (let i = 0; i < 6; i++) {
      res.push(first + i);
    }
    return res;
  };

  const getVerticalNeighborsIndices = (index: number): number[] => {
    const res = [];
    for (let i = 0; i < 6; i++) {
      res.push((index % 6) + i * 6);
    }
    return res;
  };

  const isInBoard = (i: number, j: number, deltaX: number, deltaY: number): boolean =>
    i + deltaX >= 0 && i + deltaX < 6 && j + deltaY >= 0 && j + deltaY < 6;
  const getCoordinates = (index: number) => ({ i: Math.floor(index / 6), j: index % 6 });
  const getIndex = (i: number, j: number) => i * 6 + j;

  const getDiagonalNeighborsIndices = (index: number, deltaX: number, deltaY: number, res: number[]) => {
    const indexCoord = getCoordinates(index);
    while (isInBoard(indexCoord.i, indexCoord.j, deltaX, deltaY)) {
      indexCoord.i += deltaX;
      indexCoord.j += deltaY;
      res.push(getIndex(indexCoord.i, indexCoord.j));
    }
  };

  const getDiagonalEastNeighborsIndices = (index: number): number[] => {
    const res = [];
    res.push(index);
    getDiagonalNeighborsIndices(index, 1, -1, res);
    getDiagonalNeighborsIndices(index, -1, 1, res);
    return res;
  };

  const getDiagonalWestNeighborsIndices = (index: number): number[] => {
    const res = [];
    res.push(index);
    getDiagonalNeighborsIndices(index, -1, -1, res);
    getDiagonalNeighborsIndices(index, 1, 1, res);
    return res;
  };

  const getNeighborsIndices = (index: number, kind: CellKind): number[] => {
    let res: number[] = [];
    switch (kind) {
      case "h":
        res = getHorizontalNeighborsIndices(index);
        break;
      case "v":
        res = getVerticalNeighborsIndices(index);
        break;
      case "e":
        res = getDiagonalEastNeighborsIndices(index);
        break;
      case "w":
        res = getDiagonalWestNeighborsIndices(index);
        break;
      default:
        res = [];
        break;
    }
    return res.sort((a, b) => a - b);
  };

  const checkInsertDirection = (index: number, direction: CellKind) => {
    const n = getNeighborsIndices(index, direction);
    const indexInNeighbors = n.indexOf(index);
    let min = -1;
    let max = -1;
    //- from indexInNeighbors search in both directions
    for (let i = indexInNeighbors - 1; i >= 0; i--) {
      const cell = cells[n[i]];
      if (cell.isOtherPlayer(isPlayerOne)) {
        min = i;
        break;
      } else if (cell.ring === RingType.NONE) {
        break;
      }
    }
    if (min < 0) return [];
    for (let i = indexInNeighbors + 1; i < n.length; i++) {
      const cell = cells[n[i]];
      if (cell.isOtherPlayer(isPlayerOne)) {
        max = i;
        break;
      } else if (cell.ring === RingType.NONE) {
        break;
      }
    }
    if (max < 0) return [];
    //- we found insert, return the couple of index that should be flipped
    return [n[min], n[max]];
  };

  const setCellToCurrentPlayer = (index: number) =>
    cells[index].setRing(isPlayerOne ? RingType.PLAYER1 : RingType.PLAYER2);

  /**
   * Returns the array of cell indices that need to be flipped
   * @param index clicked cell index
   * @return array of cell indices, it is empty if no insert detected
   */
  const checkInsert = (index: number) => {
    const insertE = checkInsertDirection(index, "e");
    const insertW = checkInsertDirection(index, "w");
    const insertH = checkInsertDirection(index, "h");
    const insertV = checkInsertDirection(index, "v");
    return [...insertE, ...insertW, ...insertH, ...insertV];
  };

  const isWinnerDirection = (index: number, direction: CellKind): number[] => {
    const n = getNeighborsIndices(index, direction);
    const indexInNeighbors = n.indexOf(index);
    let min = indexInNeighbors;
    let max = indexInNeighbors;
    //- from indexInNeighbors search in both directions
    for (let i = indexInNeighbors - 1; i >= 0; i--) {
      const cell = cells[n[i]];
      if (cell.isCurrentPlayer(isPlayerOne)) {
        min = i;
      } else {
        break;
      }
    }
    for (let i = indexInNeighbors + 1; i < n.length; i++) {
      const cell = cells[n[i]];
      if (cell.isCurrentPlayer(isPlayerOne)) {
        max = i;
      } else {
        break;
      }
    }
    return n.slice(min, max + 1);
  };

  const checkWinner = (): boolean => {
    if (moves.length === 0) return false;
    const index = moves[moves.length - 1].position;
    const winnerE = isWinnerDirection(index, "e");
    if (winnerE.length >= 5) {
      winnerE.forEach((i) => cells[i].setWinner());
      return true;
    }
    const winnerW = isWinnerDirection(index, "w");
    if (winnerW.length >= 5) {
      winnerW.forEach((i) => cells[i].setWinner());
      return true;
    }
    const winnerH = isWinnerDirection(index, "h");
    if (winnerH.length >= 5) {
      winnerH.forEach((i) => cells[i].setWinner());
      return true;
    }
    const winnerV = isWinnerDirection(index, "v");
    if (winnerV.length >= 5) {
      winnerV.forEach((i) => cells[i].setWinner());
      return true;
    }
    return false;
  };

  /**
   * Change the grid cells accordingly to the move
   * @param index the clicked cell index
   * @returns Move the new move
   */
  const handleNewMove = (index: number): Move => {
    const newMove = new Move(isPlayerOne, index);
    //- set the index one to P1 or P2
    cells[index].setRing(isPlayerOne ? RingType.PLAYER1 : RingType.PLAYER2);
    //- check possible insert and flip if necessary
    const inserts = checkInsert(index);
    inserts.forEach((i) => {
      setCellToCurrentPlayer(i);
    });
    //- save insert indices in move object
    newMove.setInserts(inserts);
    return newMove;
  };

  const noMoreFreeNeighbors = (neighbors: number[]): boolean => neighbors.every((i) => cells[i].ring !== RingType.NONE);

  const computeNextPossibleMoves = () => {
    let possibleMoves = [...Array(36).keys()]; // all cells by default
    if (moves.length > 0) {
      const index = moves[moves.length - 1].position;
      possibleMoves = getNeighborsIndices(index, cells[index].kind);
      if (noMoreFreeNeighbors(possibleMoves)) {
        cells.forEach((c, i) => {
          if (c.ring === RingType.NONE) possibleMoves.push(i);
        });
      }
    }
    //- highlight next possible moves
    possibleMoves.forEach((i) => cells[i].highlight());
  };

  const handleCellClicked = (index: number) => {
    //- clean hihglighted cells
    cells.forEach((c) => c.cleanHighlighted());
    //- handle new move
    const newMove = handleNewMove(index);
    moves.push(newMove);
    setMoves([...moves]);
  };

  const undoMove = (move: Move) => {
    //- clear the played position
    cells[move.position].setRing(RingType.NONE);
    //- clear inserts if any
    move.inserts.forEach((i) => cells[i].flipPlayer());
  };

  const handleBackMove = () => {
    //- clean hihglighted cells
    cells.forEach((c) => c.clean());
    //- pop the last move
    const lastMove = moves.pop();
    if (!lastMove) return;
    undoMove(lastMove);
    if (gameOver) {
      setGameOver(false);
      //- change player because it was not changed previously due to game over
      setIsPlayerOne((prev) => !prev);
    }
    setMoves([...moves]);
  };

  const ringClassName = `ring ${isPlayerOne ? "player1" : "player2"}`;

  return (
    <div style={{ display: "flex", justifyContent: "center", columnGap: "6rem", flexWrap: "wrap" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
        }}
      >
        <h1> INSERT</h1>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)" }}>
          {cells.map((c, i) => (
            <Cell key={i} cell={c} size="50px" onCellClicked={() => handleCellClicked(i)} />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          {gameOver ? <h3>Winner</h3> : <h3>Player</h3>}
          <div className={ringClassName} onClick={(e) => setIsPlayerOne((prev) => !prev)} />
        </div>
      </div>
      <MoveList moves={moves} onBackClick={handleBackMove} />
    </div>
  );
};

export default Board;
