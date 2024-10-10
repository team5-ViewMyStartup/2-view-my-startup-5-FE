import React from "react";
import spinner from "../assets/spinner.gif";

export default () => {
  return (
    <>
      <img src={spinner} alt="로딩중" />
      <h3>Loading...</h3>
    </>
  );
};
