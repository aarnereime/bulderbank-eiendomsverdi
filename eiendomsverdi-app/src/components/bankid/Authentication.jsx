import React, { useState} from "react";
import { BankID } from "./BankID.jsx";
import { Loading } from "./Loading.jsx";

const Authentication = (props) => {

  let [pNr, setPnr] = useState(null);

  return (
    <div>
      {pNr == null ? (
        <BankID setPnr = {setPnr} mixpanel = {props.mixpanel}/>
      ) : (
        <Loading pNr = {pNr} mixpanel = {props.mixpanel}/>
      )}
    </div>
  );
};

export default Authentication;
