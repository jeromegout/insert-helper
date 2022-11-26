export class Move {
  firstPlayer: boolean;
  position: number;
  inserts: number[]; // couple of indices that were flipped by this move

  constructor(first: boolean, index: number) {
    this.firstPlayer = first;
    this.position = index;
    this.inserts = [];
  }

  setInserts(inserts: number[]) {
    this.inserts = [...inserts];
  }
}

export default Move;
