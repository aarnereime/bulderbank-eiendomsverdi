import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./bankid.css";

const BankID = () => {
  const navigate = useNavigate();
  const fødselsnummerRef = useRef();

  const [allValues, setAllValues] = useState({
    firstname: "",
    // lastname: "",
    // gender: "",
  });

  let handleSubmit = async (event) => {
    // unngår å refreshe siden
    event.preventDefault();

    // setter en global api variabel til fødselsnummer i input
    let fødselsnummer = fødselsnummerRef.current.value;

    // sender fødselsnummer fra input til backend
    axios
      .get("http://localhost:3001/api")
      .then((response) => {
        console.log(response)
        axios
          .post("http://localhost:3001/pNr", { pNr: fødselsnummer })
          .then((response) => {
            setAllValues({
              firstname: response.data.apiInfo.data.address.streetName,
              // lastname: response.data.data.address.streetLetter,
              // gender: response.data.data.address.municipality,
            });
            console.log(allValues.firstname)
          })
          .catch((error) => {
            console.log(error);
          });
      })

      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });

    // fjerner det man skrev inn i input
    event.target.reset();

    //navigerer tilbake til mainpage (senere skal denne ta oss videre til visning av eiendomwverdien)
    navigate("/boligverdi");
  };

  // Gjør det bare mulig å taste inn tall i inputen
  const allowOnlyNumbersInput = (event) => {
    !/[0-9]/.test(event.key) && event.preventDefault();
  };

  return (
    <div className="bankid">
      <div className="bb-innlogging">
        <div className="rødpil">
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>
          </Link>
        </div>

        <div className="innloggingTekst">
          <h1>Innlogging til Bulder Bank</h1>
        </div>

        <div className="right"></div>
      </div>

      <div className="bb-fødselsnummer">
        <form onSubmit={handleSubmit}>
          <h2>Hva er ditt fødselsnummer:</h2>

          <input
            className="fødselsnummer-login"
            ref={fødselsnummerRef}
            type="text"
            required="required"
            placeholder="11 siffer"
            maxLength="11"
            minLength="11"
            onKeyPress={allowOnlyNumbersInput}
          />

          <button type="submit" className="fødselsnummer-neste">
            Neste
          </button>
        </form>
      </div>
    </div>
  );
};

export default BankID;
