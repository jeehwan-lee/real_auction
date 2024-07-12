import React from "react";
import Spinner from "../../assets/spinner.gif";

function Loading() {
  return (
    <>
      <img src={Spinner} width="20%" height="20%" />
    </>
  );
}

export default Loading;
