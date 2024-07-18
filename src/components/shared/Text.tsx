import React from "react";

interface TextProps {
  label: string;
  color: string;
  size: "text-sm" | "text-base" | "text-lg" | "text-xl";
  bold?: boolean;
}
function Text({ label, color, size, bold }: TextProps) {
  return (
    <div className={`${size} ${color} ${bold === true ? "font-bold" : ""}`}>
      {label}
    </div>
  );
}

export default Text;
