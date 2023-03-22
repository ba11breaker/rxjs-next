import React from "react";
import "./index.css"

const takeUntilFunc = (endRange: number, currentNumber: number) => {
  return endRange > currentNumber
    ? (val: number) => val <= endRange
    : (val: number) => val >= endRange
}

const SmartCounter : React.FC = () => {
  const [currentNumber, setCurrentNumber] =  React.useState<number>(0);

  return (
    <div className="container">
      <input id="range" type="number" />
      <h1 id="display"></h1>
    </div>
  )
};

export default SmartCounter
