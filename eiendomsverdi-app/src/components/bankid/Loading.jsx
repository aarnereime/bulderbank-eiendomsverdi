import "./loading.css";
import logo from "../../images/BulderB.svg";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Loading = (props) => {
  const navigate = useNavigate();
  const fødselsnummer = props.pNr;

  let [apiValues, setApiValues] = useState({
    firstname: "",
    apiInfo: [],
    // houseValue: "",
  });

  let [loading, setLoading] = useState(true);

  // sender fødselsnummer fra input til backend
  useEffect(() => {
    const controller = new AbortController();
    axios
      .post("http://localhost:3001/api", {
        signal: controller.signal,
        pNr: fødselsnummer,
      })
      .then((response) => {
        setApiValues({
          firstname: response.data.firstname.name,
          apiInfo: response.data.apiInfo,
          // houseValue: response.data.data.address.municipality,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
        navigate("/stopPage")
      });
    return () => {
      controller.abort();
    };
  }, []);

  if (!loading) {
    navigate("/boligverdi", {
      state: { pNr: fødselsnummer, apiValues: apiValues },
    });
  }

  return (
    <div className="Loading">
      <div className="loadingImg">
        <img className="BulderB-logo" src={logo} />
        <h2 style={{ marginTop: "100px" }}>Henter data...</h2>
      </div>
    </div>
  );
};
