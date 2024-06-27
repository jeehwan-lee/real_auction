import React from "react";
import Navbar from "./components/shared/Navbar";
import BottomTab from "./components/shared/BottomTab";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="bg-primary-darken text-bold text-black inline-flex items-center p-4 rounded shadow-md">
        Not Pretty Code 😵
      </div>
      <BottomTab />
    </div>
  );
}

export default App;
