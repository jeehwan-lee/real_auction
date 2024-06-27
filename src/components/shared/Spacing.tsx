import React from "react";

function Spacing({ size }: { size: number }) {
  return <div className={`h-${size}`}></div>;
}

export default Spacing;
