export type PartKind = "Y" | "H" | "C" | "S";

class BoardPart {
  kind: PartKind;
  orientation: number; // 0, 90, 180, 270

  constructor(kind: PartKind, orientation: number = 0) {
    this.kind = kind;
    this.orientation = orientation;
  }

  public toCells() {
    let base = [];
    switch (this.kind) {
      case "C":
        base = this.orientation === 0 || this.orientation === 180 ? ["wwe", "vhh", "vwe"] : ["eew", "hvv", "hew"];
        break;
      case "H":
        base = this.orientation === 0 || this.orientation === 180 ? ["ewh", "vvh", "hwe"] : ["wev", "hhv", "vew"];
        break;
      case "S":
        base = this.orientation === 0 || this.orientation === 180 ? ["ehv", "whw", "evv"] : ["wvh", "eve", "whh"];
        break;
      case "Y":
        base = this.orientation === 0 || this.orientation === 180 ? ["hwe", "veh", "ewv"] : ["vew", "hwv", "weh"];
        break;
      default:
        base = ["wwe", "vhh", "vwe"];
    }
    if (this.orientation === 0) return base;
    const r0 = base[0].split("");
    const r1 = base[1].split("");
    const r2 = base[2].split("");
    if (this.orientation === 90) {
      return [r0[2] + r1[2] + r2[2], r0[1] + r1[1] + r2[1], r0[0] + r1[0] + r2[0]];
    } else if (this.orientation === 180) {
      return [r2[2] + r2[1] + r2[0], r1[2] + r1[1] + r1[0], r0[2] + r0[1] + r0[0]];
    } else if (this.orientation === 270) {
      return [r2[0] + r1[0] + r0[0], r2[1] + r1[1] + r0[1], r2[2] + r1[2] + r0[2]];
    } else throw new Error("wrong orientation (only supports 0, 90, 180, 270 " + this.orientation);
  }

  public toString = () => `${this.kind}${this.orientation}`;

  static mergeParts = (pl: BoardPart, pr: BoardPart) => {
    const l = pl.toCells();
    const r = pr.toCells();
    return [...(l[0] + r[0]).split(""), ...(l[1] + r[1]).split(""), ...(l[2] + r[2]).split("")];
  };
}

export default BoardPart;
