import React, { useState} from "react";
import { BankID } from "./BankID.jsx";
import { Loading } from "./Loading.jsx";

const Authentication = (props) => {

  //pnr to be updated later.
  let [pNr, setPnr] = useState(null);
  //renders bankId page or loading page depending on if we have a personId
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
