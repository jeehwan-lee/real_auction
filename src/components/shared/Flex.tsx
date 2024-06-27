import React from "react";

function Flex({ children }: { children: React.ReactNode }) {
  return <div className="flex justify-between">{children}</div>;
}

export default Flex;
