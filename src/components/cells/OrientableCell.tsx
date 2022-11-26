import React from "react";
import { CellKind } from "../../types/Cell";
import E_Cell from "./E_Cell";
import H_Cell from "./H_Cell";
import V_Cell from "./V_Cell";
import W_Cell from "./W_Cell";

interface CellProps {
  kind: CellKind;
  orientation: number;
  size: string;
}

const OrientatableCell = ({ kind, orientation, size }: CellProps) => {
  if (kind === "e") {
    switch (orientation) {
      case 0:
      case 180:
        return <E_Cell w={size} />;
      case 90:
      case 270:
        return <W_Cell w={size} />;
      default:
        return <E_Cell w={size} />;
    }
  } else if (kind === "w") {
    switch (orientation) {
      case 0:
      case 180:
        return <W_Cell w={size} />;
      case 90:
      case 270:
        return <E_Cell w={size} />;
      default:
        return <W_Cell w={size} />;
    }
  } else if (kind === "h") {
    switch (orientation) {
      case 0:
      case 180:
        return <H_Cell w={size} />;
      case 90:
      case 270:
        return <V_Cell w={size} />;
      default:
        return <H_Cell w={size} />;
    }
  } else if (kind === "v") {
    switch (orientation) {
      case 0:
      case 180:
        return <V_Cell w={size} />;
      case 90:
      case 270:
        return <H_Cell w={size} />;
      default:
        return <V_Cell w={size} />;
    }
  } else throw new Error('shuold only be one of "h", "v", "e", "w" but get: ' + kind);
};

export default OrientatableCell;
