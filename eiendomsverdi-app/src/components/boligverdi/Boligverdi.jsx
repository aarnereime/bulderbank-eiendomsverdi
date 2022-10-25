import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./boligverdi.css";

const Boligverdi = () => {
  const location = useLocation();

  const fødselsnummer = location.state.pNr;

  let estimert_boligverdi = "6 500 000 - 7 000 000";

  const [loading, setLoading] = useState(true);

  let [allValues, setAllValues] = useState({
    firstname: "",
    address: "",
    streetNumber: "",
    streetLetter: "",
    postCode: "",
    city: "",
    // houseValue: "",
  });

  // sender fødselsnummer fra input til backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/api")
      .then((response) => {
        axios
          .post("http://localhost:3001/pNr", { pNr: fødselsnummer })
          .then((response) => {
            setAllValues({
              firstname: response.data.firstname.owner.name,
              address: response.data.apiInfo.data.address.streetName,
              streetNumber: response.data.apiInfo.data.address.streetNumber,
              streetLetter: response.data.apiInfo.data.address.streetLetter,
              postCode: response.data.apiInfo.data.address.postOffice.code,
              city: response.data.apiInfo.data.address.postOffice.name,
              // houseValue: response.data.data.address.municipality,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

  const firstname = allValues.firstname.split(" ")[0]
  const firstnameRightFormat = (firstname[0] + firstname.substring(1).toLowerCase())

  return (
    <div className="boligverdi">
      <div className="boligverdi-grid">
        <div className="hallaien-headline">
          <h1>Hallaien, {firstnameRightFormat}! 🤩</h1>

          <h3>Dette var boligene vi fant på deg</h3>
          <h4>Velg en bolig for å se detaljer om bolig og verdi</h4>
        </div>

        <div className="bolig">
          <div className="addresse">
            {allValues.address} {allValues.streetNumber}
            {allValues.streetLetter},<br></br> {allValues.postCode},{" "}
            {allValues.city}
          </div>
          <div className="estimert_boligverdi_teskt">
            Data estimert boligverdi
          </div>
          <div className="estimert-boligverdi">{estimert_boligverdi}</div>
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
        </div>
        <button type="submit" className="søk-om-lån">
          Søk om lån
        </button>

        <div className="neste-prisantydning">
          <a href="">Gi meg beskjed ved neste prisantydning</a>
          <div className="rødpil">
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
          </div>
        </div>

        <div className="dropdown">
          <button onClick={onClick} className="dropbtn">
            <p>Stemmer ikke bolig verdien din</p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`dropdown-indicator ${
                isActive ? "active" : "inactive"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          <div
            ref={dropdownRef}
            className={`dropdown-content ${isActive ? "active" : ""}`}
          >
            <p>
              Dersom du nylig har pusset opp eller bygget ut vil dette{" "}
              <strong>Ikke</strong> tas hensyn til. For å få et reelt estimat må
              du gjennomføre en e-takst.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Boligverdi;
