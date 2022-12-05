import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./bankid.css";

export const BankID = (props) => {
  const fødselsnummerRef = useRef();

  const handleSubmit = async (event) => {
    // unngår å refreshe siden
    event.preventDefault();

    // setter en global api variabel til fødselsnummer i input
    let fødselsnummer = fødselsnummerRef.current.value;

    props.setPnr(fødselsnummer);

    // fjerner det man skrev inn i input
    event.target.reset();
  };

  // Gjør det bare mulig å taste inn tall i inputen
  const allowOnlyNumbersInput = (event) => {
    !(event.key in [...Array(10).keys()] || event.key === "Enter") &&
      event.preventDefault();
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
            <span>Neste</span>
          </button>
        </form>
      </div>
    </div>
  );
};
