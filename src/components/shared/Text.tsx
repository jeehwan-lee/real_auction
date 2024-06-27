import React from "react";

interface TextProps {
  label: string;
  color: string;
  size: "sm" | "base" | "lg" | "xl";
  bold?: boolean;
}
function Text({ label, color, size, bold }: TextProps) {
  return (
    <div
      className={`text-${size} text-${color} ${
        bold === true ? "font-bold" : ""
      }`}
    >
      {label}
    </div>
  );
}

export default Text;
