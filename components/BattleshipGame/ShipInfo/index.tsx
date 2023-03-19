import React from "react";
import { BehaviorSubject, map } from "rxjs";

export interface Props {
  score: BehaviorSubject<any>
} 

const Component : React.FC<Props> = ({ score }) => (
  <>
    {Object.keys(score.value.ships).map(key => (
      <>
        <b>{key}</b>{`: ${score.value.ships[key]} | `}
      </>
    ))}
  </>
)
export default Component;