import React, { useState} from "react";
import { BankID } from "./BankID.jsx";
import { Loading } from "./Loading.jsx";

const Authentication = () => {

  let [pNr, setPnr] = useState(null);

  return (
    <div>
      {pNr == null ? (
        <BankID setPnr = {setPnr}/>
      ) : (
        <Loading pNr = {pNr}/>
      )}
    </div>
  );
};

export default Authentication;
