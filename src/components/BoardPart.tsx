import { useEffect, useState } from "react";
import PartModel, { PartKind } from "../types/BoardPart";
import { CellKind } from "../types/Cell";
import OrientatableCell from "./cells/OrientableCell";

interface PartProps {
  part: PartModel;
  size?: string;
}

const BoardPart = ({ part, size = "30px" }: PartProps) => {
  const getContent = (kind: PartKind) => {
    switch (kind) {
      case "C":
        return ["wwe", "vhh", "vwe"];
      case "H":
        return ["ewh", "vvh", "hwe"];
      case "S":
        return ["ehv", "whw", "evv"];
      case "Y":
        return ["hwe", "veh", "ewv"];
      default:
        return ["wwe", "vhh", "vwe"];
    }
  };

  const orientContent = (base: string[], orientation: number) => {
    const r0 = base[0].split("");
    const r1 = base[1].split("");
    const r2 = base[2].split("");
    if (orientation === 0) return base;
    else if (orientation === 90) {
      return [r0[2] + r1[2] + r2[2], r0[1] + r1[1] + r2[1], r0[0] + r1[0] + r2[0]];
    } else if (orientation === 180) {
      return [r2[2] + r2[1] + r2[0], r1[2] + r1[1] + r1[0], r0[2] + r0[1] + r0[0]];
    } else if (orientation === 270) {
      return [r2[0] + r1[0] + r0[0], r2[1] + r1[1] + r0[1], r2[2] + r1[2] + r0[2]];
    } else throw new Error("wrong orientation (only supports 0, 90, 180, 270 " + orientation);
  };

  useEffect(() => {
    const baseContent = getContent(part.kind); // content for 0° orientation
    setContent(orientContent(baseContent, part.orientation));
  }, [part]);

  const [content, setContent] = useState(getContent(part.kind));
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "5px", border: "1px solid #555555" }}>
      {content.map((row, i) =>
        row
          .split("")
          .map((char, j) => (
            <OrientatableCell key={i * 10 + j} kind={char as CellKind} orientation={part.orientation} size={size} />
          ))
      )}
    </div>
  );
};

export default BoardPart;
