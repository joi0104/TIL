import React from "react";

const Counter = ({ onIncrease, onDecrease, number }) => {
  return (
    <>
      <h1>{number}</h1>
      <button onClick={onIncrease}>+1</button>
      <button onClick={onDecrease}>-1</button>
    </>
  );
};

export default Counter;
