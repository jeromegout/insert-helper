import React from "react";

const H_Cell = ({ w = "30px", color = "#ffffff", gap = "0", border = false }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 448"
      width={w}
      height={w}
      style={{ padding: gap, border: border ? "1px solid" : "none" }}
    >
      <path
        fill={color}
        d="M 447.934 225 L 448 225 C 447.955 235 443 243.154 425 243.154 L 20.681 243.131 C 5.113 243.154 0 235 0 225 C 0 215 5.113 204.08 19.826 204 L 425.871 204.141 C 443 204.08 447.98 215 447.934 225 Z"
      />
    </svg>
  );
};

export default H_Cell;
