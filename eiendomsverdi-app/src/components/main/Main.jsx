import React from 'react'
import './main.css'
import img from '../../images/Du-kan-flytte-lånet2.png';
import { Link } from 'react-router-dom'

const Main = () => {


  return (
    <div className="main">
      <div className="bb-eiendomsverdi__blockelement">
        <div className="bb-eiendomsverdi-grid sjekk">
          <article
            className="bb-col-1"
            style={{
              width: "calc(100% - 15px)",
              paddingRight: "15px",
              marginRight: "10px",
            }}
          >
            <h1 style={{ fontSize: "68px" }}>Sjekk din boligverdi</h1>

            <h2 style={{ fontSize: "32px" }}>
              Hvilken rolle spiller det for deg?{" "}
              <span role="img" aria-label="Stars">
                ✨
              </span>
            </h2>
            <ul className="checklist-ul-list list1">
              <li className="checklist-li-item">
                Får du den renten som du fortjener? Å vite boligverdien din gir
                deg et forhandlingskort i møte med banken{" "}
              </li>
              <li className="checklist-li-item">
                Du kan ha urealisert potensiale i din bolig!
              </li>
            </ul>

            <div className="sok-laan__button-wrapper">
              <Link to="/bankid">
                <button className="button-sok-om-laan">
                  <span>Sjekk boligverdi</span>
                </button>
              </Link>
            </div>
          </article>

          <div className="bb-col1" style={{ height: "100%" }}>
            <img src={img} alt="logo" height="500px" width="auto" />
          </div>
        </div>

        <div className="bb-eiendomsverdi-grid hvordan">
          <div
            className="bb-col-1"
            style={{
              width: "calc(100% - 15px)",
              paddingRight: "15px",
              marginRight: "10px",
            }}
          >
            <h2 style={{ fontSize: "35px" }}>Hvordan fungerer det?</h2>
            <ol className="checklist-ul-list list2">
              <li className="checklist-li-item">Identifiser deg med BankID</li>
              <li className="checklist-li-item">
                Vi sjekker hvilke boliger som står i ditt navn og krønsjer litt
                tall basert på tilgjengelig data
              </li>
              <li className="checklist-li-item">
                Du velger den boligen som du vil ha informasjon angående
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main



