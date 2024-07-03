import React, { HTMLAttributes } from "react";

interface FlexProps extends HTMLAttributes<HTMLDivElement> {
  direction: "flex-row" | "flex-col";
  children: React.ReactNode;
  justify?: string;
  align?: string;
  classNameProps?: string;
}

function Flex({
  direction,
  justify,
  align,
  children,
  classNameProps,
  ...props
}: FlexProps) {
  return (
    <div
      className={`flex ${justify ? justify : "justify-between"} ${
        align ? align : "items-center"
      }
       ${direction} ${classNameProps}`}
      {...props}
    >
      {children}
    </div>
  );
}

export default Flex;
