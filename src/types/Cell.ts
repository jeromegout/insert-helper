export type CellKind = "e" | "w" | "h" | "v";
export enum RingType {
  PLAYER1,
  PLAYER2,
  NONE,
  HIGHLIGHTED,
  WINNER1,
  WINNER2,
}

export class Cell {
  readonly kind: CellKind;
  ring: RingType;

  constructor(kind: CellKind, ring?: RingType) {
    this.kind = kind;
    this.ring = ring !== undefined ? ring : RingType.NONE;
  }

  cleanHighlighted = () => {
    if (this.ring === RingType.HIGHLIGHTED) this.setRing(RingType.NONE);
  };

  clean = () => {
    this.cleanHighlighted();
    if (this.ring === RingType.WINNER1) this.setRing(RingType.PLAYER1);
    if (this.ring === RingType.WINNER2) this.setRing(RingType.PLAYER2);
  };

  flipPlayer = () => {
    if (this.ring === RingType.WINNER1 || this.ring === RingType.PLAYER1) this.setRing(RingType.PLAYER2);
    else if (this.ring === RingType.WINNER2 || this.ring === RingType.PLAYER2) this.setRing(RingType.PLAYER1);
  };

  highlight = () => {
    //- only empty cell could be highlighted
    if (this.ring === RingType.NONE) this.setRing(RingType.HIGHLIGHTED);
  };

  setRing = (ring: RingType) => {
    this.ring = ring;
  };

  isOtherPlayer = (firstPlayer: boolean): boolean =>
    firstPlayer ? this.ring === RingType.PLAYER2 : this.ring === RingType.PLAYER1;

  isCurrentPlayer = (firstPlayer: boolean): boolean =>
    firstPlayer ? this.ring === RingType.PLAYER1 : this.ring === RingType.PLAYER2;

  setWinner = () => {
    if (this.ring === RingType.PLAYER1) this.setRing(RingType.WINNER1);
    else if (this.ring === RingType.PLAYER2) this.setRing(RingType.WINNER2);
  };
}

export default Cell;
