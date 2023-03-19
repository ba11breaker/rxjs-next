import React from "react";
import { BehaviorSubject, map } from "rxjs";
import ReactRx from 'react-rx';

export interface Props {
  score: BehaviorSubject<any>
} 

const Component  = ReactRx.reactiveComponent<Props>((props$) => 

  props$.pipe(
    map(({ score }) => (
      Object.keys(score.value.ships).map(key => (
        <>
          <b>{key}</b>{`: ${score.value.ships[key]} | `}
        </>
      ))
    ))
  )
);

export default Component;