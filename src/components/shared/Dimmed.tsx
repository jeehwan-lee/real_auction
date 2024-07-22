import React from "react";

interface DimmedProps {
  children: React.ReactNode;
}

function Dimmed({ children }: DimmedProps) {
  return (
    <div className="fixed top-0 w-full max-w-[430px] h-full flex justify-center items-center z-50 bg-black bg-opacity-50">
      {children}
    </div>
  );
}

export default Dimmed;
