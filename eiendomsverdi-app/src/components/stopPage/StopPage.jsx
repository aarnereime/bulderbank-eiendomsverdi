import React from "react";
import "./stoppage.css";
import img from "../../images/Heart-stopPage.png";
import { useLocation, useNavigate } from "react-router-dom";

const StopPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const errorMessage = location.state.error;

  const tilbakeHjemside = () => {
    navigate("/");
  };

  return (
    <div className="StopPage">
      <div className="StopPage-grid">
        <div className="stopPage-heart">
          <img
            src={img}
            alt="heart"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>
        <h1>Oi, her har det gått litt skeis</h1>
        <p>{errorMessage}</p>
        <div className="stopPage-neste-prisantydning">
          <div className="neste-prisantydning-tekst">
            <a href="/email" className="stopPage-neste-prisantydning-link">
              Gi meg beskjed ved neste prisantydning
            </a>
          </div>
          <div className="pilogbue">
            <div className="rødpil-neste-prisantydning">
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
        </div>
        <div className="hjemsideKnappContainer">
          <button onClick={tilbakeHjemside} className="hjemsideKnapp">
            <span>Tilbake til hjemside</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default StopPage;
