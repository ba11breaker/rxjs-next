import React from "react";
import { BehaviorSubject, combineLatestAll, filter, map, tap, withLatestFrom } from "rxjs";
import "./index.css"

const takeUntilFunc = (endRange: number, currentNumber: number) => {
  return endRange > currentNumber
    ? (val: number) => val <= endRange
    : (val: number) => val >= endRange
};

const positiveOrNegative = (endRange: number, currentNumber: number) => {
  return endRange > currentNumber ? 1 : -1;
};

const SmartCounter : React.FC = () => {
  const [currentNumber, setCurrentNumber] =  React.useState<number>(0);

  const inputSubject = React.useMemo(() => new BehaviorSubject<string >(''), []);
  const keyUpSubject = React.useMemo(() => new BehaviorSubject<string>(''), []);

  const inputChange$ = React.useMemo(() => inputSubject, [inputSubject]);

  const enter$ = React.useMemo(() => keyUpSubject.pipe(
    filter(value => value === 'Enter'),
    withLatestFrom(inputChange$),
  ), [keyUpSubject, inputChange$]);

  React.useEffect(() => {
    const sub = enter$.subscribe(([_,number]) => setCurrentNumber(() => Number(number)));
    return () => {
      sub.unsubscribe();
    };
  }, [enter$]);

  return (
    <div className="container">
      <input id="range" type="number" onChange={evt => inputSubject.next(evt.target.value)} onKeyUp={evt => keyUpSubject.next(evt.key)} />
      <h1 id="display"></h1>
    </div>
  )
};

export default SmartCounter
