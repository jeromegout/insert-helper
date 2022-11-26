import React from "react";

const W_Cell = ({ w = "30px", color = "#ffffff", gap = "0", border = false }) => {
  return (
    <svg
      version="1.1"
      width={w}
      height={w}
      viewBox="0 0 448 448"
      xmlns="http://www.w3.org/2000/svg"
      style={{ padding: gap, border: border ? "1px solid" : "none" }}
    >
      <path
        fill={color}
        d="M 521.556 224.519 L 521.644 224.519 C 521.585 234.519 514.989 242.673 491.033 242.673 L -47.084 242.65 C -67.802 242.673 -74.608 234.519 -74.608 224.519 C -74.608 214.519 -67.802 203.599 -48.221 203.519 L 492.192 203.66 C 514.989 203.599 521.617 214.519 521.556 224.519 Z"
        transform="matrix(0.707107, 0.707107, -0.707107, 0.707107, 223.219589, -92.707771)"
      ></path>
    </svg>
  );
};

export default W_Cell;
