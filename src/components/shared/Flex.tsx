import React, { HTMLAttributes } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction: "flex-row" | "flex-col";
  children: React.ReactNode;
}

function Flex({ direction, children, ...props }: FlexProps) {
  return (
    <div
      className={`flex justify-between items-center ${direction}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Flex;
