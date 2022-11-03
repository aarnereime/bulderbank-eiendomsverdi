import React from "react";
import "./loading.css";
import logo from "../../images/BulderB.svg";

export const Loading = () => {
  return (
    <div className="Loading">
      <div className="loadingImg">
        <img className="BulderB-logo" src={logo} />

        <h2 style={{marginTop: "100px"}}>Henter data...</h2>
      </div>
    </div>
  );
};
