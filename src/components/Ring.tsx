import React from "react";
import { RingType } from "../types/Cell";

export interface RingProps {
  player: RingType;
  size: string;
}

const Ring = ({ player, size }: RingProps) => {
  if (player === RingType.NONE) return null;
  return <div style={{ width: size, height: size, border: "10px solid pink", borderRadius: "50%" }}></div>;
};

export default Ring;
