import React from "react";

interface DimmedProps {
  children: React.ReactNode;
}

function Dimmed({ children }: DimmedProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
      {children}
    </div>
  );
}

export default Dimmed;
