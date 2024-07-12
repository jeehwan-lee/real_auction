import React from "react";
import Spinner from "../../assets/spinner.gif";

function Loading() {
  return (
    <>
      <img src={Spinner} width="30%" height="30%" />
    </>
  );
}

export default Loading;
