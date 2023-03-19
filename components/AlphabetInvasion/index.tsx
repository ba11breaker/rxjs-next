import React from "react";
import { BehaviorSubject, combineLatest, fromEvent, interval, map, Observable, of, scan, startWith, switchMap, takeWhile } from "rxjs";
import Board from './Board';
import { Letters, State } from "./interface";

const Component = ({
  levelChangeThreshold = 20,
  speedAdjust = 50,
  endThreshold = 15,
  gameWidth = 30,
}) => {

  const randomLetter = React.useCallback(() => String.fromCharCode(
    Math.random() * ('z'.charCodeAt(0) - 'a'.charCodeAt(0)) + 'a'.charCodeAt(0))
  , []);

  const [keys$, setKeys$] = React.useState<Observable<string>>(of(''));

  const intervalSubject  = React.useMemo(() => new BehaviorSubject(600), []);

  const letters$ = React.useMemo(() => 
    intervalSubject.pipe(
      switchMap(i => interval(i)
        .pipe(
          scan<number, Letters>((letters) => ({
            intrvl: i,
            ltrs: [({
              letter: randomLetter(),
              yPos: Math.floor(Math.random() * gameWidth)
            }), ...letters.ltrs]
          }), { ltrs: [], intrvl: 0 })
        )))
  , [intervalSubject, gameWidth]);

  React.useEffect(() => {
    setKeys$(
      fromEvent(window.document, 'keydown')
      .pipe(
        startWith({ key: '' } as any),
        map((e: KeyboardEvent) => e.key)
      )
    );
  }, []);

  const noop = React.useMemo(() => {}, []);

  const game$ = React.useMemo(() => 
    combineLatest(keys$, letters$).pipe(
      scan<[string, Letters], State>((state, [key, letters]) => (
        letters.ltrs[letters.ltrs.length - 1]
          && letters.ltrs[letters.ltrs.length - 1].letter === key
          ? (state.score = state.score + 1, letters.ltrs.pop())
          : noop,
        state.score > 0 && state.score % levelChangeThreshold === 0
          ? (
            letters.ltrs = [],
            state.level = state.level + 1,
            state.score = state.score + 1,
            intervalSubject.next(letters.intrvl - speedAdjust))
          : noop,
        ({ score: state.score, letters: letters.ltrs, level: state.level })),
        { score: 0, letters: [], level: 1 }),
      takeWhile(state => state.letters.length < endThreshold),
    )
  , [letters$, keys$, endThreshold, speedAdjust, levelChangeThreshold]);

  const [state, setState] = React.useState<State>({ score: 0, letters: [], level: 1 });

  React.useEffect(() => {
    const subGame = game$.subscribe({
      next: setState,
      complete: () => {},
      error: () => {}
    });
    return () => {
      subGame.unsubscribe();
    };
  }, [game$]);
  

  return (
    <>
      <Board
        state={state}
        gameWidth={gameWidth}
        endThreshold={endThreshold}
      />
    </>
  );
};

export default Component;