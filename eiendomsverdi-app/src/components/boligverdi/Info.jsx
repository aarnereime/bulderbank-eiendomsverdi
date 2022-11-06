import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./boligverdi.css";

export const Info = (props) => {
    const navigate = useNavigate();
    
    let estimert_boligverdi = "6 500 000 - 7 000 000";
    const dropdownRef = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const onClick = () => setIsActive(!isActive);
  
    const firstname = props.values.firstname.split(" ")[0];
    const firstnameRightFormat =
      firstname[0] + firstname.substring(1).toLowerCase();
  
    const toBoligverdiInfo = (index) => {
      navigate("/boligverdiInfo", { state: { pNr: props.fødselsnummer, idx: index, apiValues: props.values} });
    };
  
    const toSøkOmLån = () => {
      navigate("/");
    };
    
    const getHouses = (apiInfo) =>
      apiInfo.map((house, index) => (
        <div key = {index} className="bolig">
          <div className ="description">
            <div className="addresse">
                {house.data.address.streetName} {" "}
                {house.data.address.streetNumber}
                {house.data.address.streetLetter},<br></br>
                {house.data.address.postOffice.code}, {" "}
                {house.data.address.postOffice.name}
            </div>
            <div className="estimert_boligverdi_teskt">
                Data estimert boligverdi
            </div>
            <div className="estimert-boligverdi">{estimert_boligverdi}</div>
                <RødPil action = {()=>{toBoligverdiInfo(index);}}/>  
            </div>
            <div className="image">
            <img className="bildeAvHus"
                src = {`https://webapps-api.test.bulderbank.tech/Google/map?Address=${house.data.address.streetName}
                -${house.data.address.streetNumber}
                -${house.data.address.streetLetter}
                -${house.data.address.postOffice.code}
                -${house.data.address.postOffice.name}}
                %203&maptype=1&zoom=20`}
                height={150}/>
            </div>
          </div>
      )); 
  
    return(
      <div className="boligverdi">
        <div className="boligverdi-grid">
          <div className="hallaien-headline">
            <h1>Hallaien, {firstnameRightFormat}! 🤩</h1>
            <h3>Dette var boligene vi fant på deg</h3>
            <h4>Velg en bolig for å se detaljer om bolig og verdi</h4>
          </div>
          
          {getHouses(props.values.apiInfo)}
          
          <button
            onClick={() => {
              toSøkOmLån();
            }}
            className="søk-om-lån"
          >
            <span>Søk om lån</span>
          </button>
  
          <div className="neste-prisantydning">
            <a href="/email" className="neste-prisantydning-link">
              Gi meg beskjed ved neste prisantydning
            </a>
            <RødPil />
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

const RødPil = (props) => {
    return (
        <div className="rødpil">
            <a
              onClick={props.action}
            >
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
            </a>
          </div>
    );
}