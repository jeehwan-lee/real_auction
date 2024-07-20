import React from "react";

interface ParagraphTextProps {
  label: string;
  color: string;
  size: "text-sm" | "text-base" | "text-lg" | "text-xl";
  bold?: boolean;
}
function ParagraphText({ label, color, size, bold }: ParagraphTextProps) {
  return (
    <div className={`${size} ${color} ${bold === true ? "font-bold" : ""}`}>
      {label}
    </div>
  );
}

export default ParagraphText;
