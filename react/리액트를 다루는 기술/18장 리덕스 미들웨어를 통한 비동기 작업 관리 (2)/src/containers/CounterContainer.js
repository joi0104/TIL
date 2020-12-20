import React from "react";
import { useSelector } from "react-redux";
import useActions from "../lib/useActions";
import { increaseAsync, decreaseAsync } from "../modules/counter";
import Counter from "../components/Counter";

const CounterContainer = () => {
  const number = useSelector(({ counter }) => counter);

  const [onIncrease, onDecrease] = useActions(
    [increaseAsync, decreaseAsync],
    []
  );

  return (
    <Counter number={number} onIncrease={onIncrease} onDecrease={onDecrease} />
  );
};

export default CounterContainer;
