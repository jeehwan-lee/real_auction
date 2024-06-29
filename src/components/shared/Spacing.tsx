import React from "react";

function Spacing({ size }: { size: string }) {
  return <div className={`h-[${size}px]`}></div>;
}

export default Spacing;
