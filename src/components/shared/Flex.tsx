import React, { HTMLAttributes } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

function Flex({ children, ...props }: FlexProps) {
  return (
    <div className="flex justify-between" {...props}>
      {children}
    </div>
  );
}

export default Flex;
