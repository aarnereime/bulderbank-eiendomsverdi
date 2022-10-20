import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./boligverdi.css";

const Boligverdi = () => {
  let fornavn = 'John';
  let addresse = 'Gateveien 32, 5308, Kleppestø'
  let estimert_boligverdi = "6 500 000 - 7 000 000";

  const [loading, setLoading] = useState(true);

  const [allValues, setAllValues] = useState({
    firstname: "",
    // lastname: "",
    // gender: "",
  });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001/api")
  //     .then((response) => {
  //       setAllValues({
  //         firstname: response.data.apiInfo.data.address.streetName,
  //         // lastname: response.data.data.address.streetLetter,
  //         // gender: response.data.data.address.municipality,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(`Error fetching data: ${error}`);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <div className="boligverdi">
      <div className="boligverdi-grid">
        <div className="hallaien-headline">
          <h1>Hallaien, {fornavn}! 🤩</h1>

          <h3>Dette var boligene vi fant på deg</h3>
          <h4>Velg en bolig for å se detaljer om bolig og verdi</h4>
        </div>

        <div className="bolig">
          <div className="addresse">{addresse}</div>
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
      </div>
    </div>
  );
};

export default Boligverdi;

//hent all verdien på selve bankid siden isteden for å vente til du kommer til den nye boligverdi siden
