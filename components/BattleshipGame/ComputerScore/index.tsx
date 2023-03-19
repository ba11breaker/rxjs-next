import React from "react";
import { BehaviorSubject, map } from "rxjs";
import ReactRx from 'react-rx';

export interface Props {
  computerScore: BehaviorSubject<any>
} 

const Component  = ReactRx.reactiveComponent<Props>((props$) => 

  props$.pipe(
    map(({ computerScore }) => (
      <div>
        Computer score: {computerScore.value.score} <br/>
      </div>
    ))
  )
);

export default Component;