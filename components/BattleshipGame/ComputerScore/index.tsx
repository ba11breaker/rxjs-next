import React from "react";
import { BehaviorSubject } from "rxjs";

import ShipInfo from '../ShipInfo';

export interface Props {
  computerScore: BehaviorSubject<any>
} 

const Component : React.FC<Props>  = ({ computerScore }) => (
  <div>
    Computer score: {computerScore.value.score} <br/>
    <ShipInfo score={computerScore} />
  </div>
);

export default Component;