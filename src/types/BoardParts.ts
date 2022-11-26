import BoardPart, { PartKind } from "./BoardPart";
import Cell, { CellKind, RingType } from "./Cell";

class BoardParts {
  TL: BoardPart;
  TR: BoardPart;
  BL: BoardPart;
  BR: BoardPart;

  constructor(partsSlug: string) {
    const regexp = RegExp("([CHSY]{1})([0-9]{1,3})", "g");
    let res = regexp.exec(partsSlug);
    if (res !== null) this.TL = new BoardPart(res[1] as PartKind, Number.parseInt(res[2]));
    else this.TL = new BoardPart("C");
    res = regexp.exec(partsSlug);
    if (res !== null) this.TR = new BoardPart(res[1] as PartKind, Number.parseInt(res[2]));
    else this.TR = new BoardPart("H");
    res = regexp.exec(partsSlug);
    if (res !== null) this.BL = new BoardPart(res[1] as PartKind, Number.parseInt(res[2]));
    else this.BL = new BoardPart("S");
    res = regexp.exec(partsSlug);
    if (res !== null) this.BR = new BoardPart(res[1] as PartKind, Number.parseInt(res[2]));
    else this.BR = new BoardPart("Y");
  }

  public toCells = () => {
    const topCells = BoardPart.mergeParts(this.TL, this.TR);
    const bottomCells = BoardPart.mergeParts(this.BL, this.BR);
    return [...topCells, ...bottomCells].map((kind) => new Cell(kind as CellKind, RingType.HIGHLIGHTED));
  };
}

export default BoardParts;
