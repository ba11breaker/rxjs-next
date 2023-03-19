import React from "react";
import { State } from "../interface";

export interface Props {
  state: State;
  gameWidth: number;
  endThreshold: number;
};

const Component : React.FC<Props> = ({ state : {score, level, letters}, gameWidth, endThreshold  }) => ( 
  <div id="alphabet-invasion-gameboard">
    Score: ${score}, Level: ${level} <br/>
    {letters.map((l, index) => {
      const emptySpaces = Array.from({length:l.yPos}, (i: number) => (<span key={i} style={{ visibility: 'hidden' }}>-</span>));
      return <div key={index}>
        {emptySpaces}{l.letter}<br/>
      </div>
    })}
    {Array.from({length: endThreshold - letters.length - 1}, (i: number) => (<br key={i} />))}
    {'-'.repeat(gameWidth)}
  </div>
);

export default Component;