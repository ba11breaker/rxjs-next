import React from "react";
import { BehaviorSubject, map, startWith } from "rxjs";
import ReactRx from 'react-rx';
import ShipInfo from '../ShipInfo';

export interface Props {
  computerScore: BehaviorSubject<any>
} 

const Component  = ReactRx.reactiveComponent<Props>((props$) => 

  props$.pipe(
    map(({ computerScore }) => (
      <div>
        Computer score: {computerScore.value.score} <br/>
        <ShipInfo score={computerScore} />
      </div>
    ))
  )
);

export default Component;