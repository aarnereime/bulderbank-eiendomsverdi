import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {Info} from "./Info.jsx";
import {Loading} from "./Loading.jsx";

const Boligverdi = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fødselsnummer = location.state.pNr;

  let [apiValues, setApiValues] = useState({
    firstname: "",
    apiInfo: []
    // houseValue: "",
  });

  let [loading, setLoading] = useState(true);

  // sender fødselsnummer fra input til backend
  useEffect(() => {
    axios
      .post("http://localhost:3001/api",{ pNr: fødselsnummer })
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
      });
  }, []);


  return (
    <div>
      {loading ? <Loading /> : <Info values = {apiValues} fødselsnummer = {fødselsnummer}/>}
    </div>
  );
};


export default Boligverdi;
