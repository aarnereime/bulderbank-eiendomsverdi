import React, { useEffect, useState } from "react";
import "./boligverdiInfo.css";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BoligverdiInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fødselsnummer = location.state.pNr;

  let [allValues, setAllValues] = useState({
    primaryArea: "",
    usableArea: "",
    grossArea: "",
    buildYear: "",
    numberOfBedrooms: "",
    numberOfFloors: "",
  });

  // sender fødselsnummer fra input til backend
  useEffect(() => {
    axios
      .get("http://localhost:3001/api")
      .then((response) => {
        setAllValues({
          primaryArea: response.data.apiInfo.data.attributes.primaryArea.value,
          usableArea: response.data.apiInfo.data.attributes.usableArea.value,
          grossArea: response.data.apiInfo.data.attributes.grossArea.value,
          buildYear: response.data.apiInfo.data.attributes.buildYear,
          numberOfBedrooms:
            response.data.apiInfo.data.attributes.numberOfBedrooms,
          numberOfFloors: response.data.apiInfo.data.attributes.numberOfFloors,
        });
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  const toBoligverdi = () => {
    navigate("/boligverdi", { state: { pNr: fødselsnummer } });
  };

  return (
    <div className="BoligverdiInfo">
      <div className="rødpil">
        <a
          onClick={() => {
            toBoligverdi();
          }}
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
      <div className="boligverdiInfo-grid">
        <img
          className="bildeAvHus"
          src="https://www.webatlas.no/WAAPI-Statiskkart/punkt/?x=5.65390586853027&y=58.7331085205078&SRS=4326&KartType=aerial&api_key=9da664c7-e5b9-4dc7-a093-7ef0f90563c0&PikslerPerMeter=4.5&Bredde=980&Hoyde=400&SkjulMarkor=true"
          height={350}
        />

        <h2 className="h2påBoligverdiInfo">Detaljer</h2>

        {/* dette bør gjøres om til for loop */}
        <div className="husInformasjon">
          <p>Primærrom m2</p>
          <p style={{ color: "#ff4d5b" }}>{allValues.primaryArea} m2</p>
        </div>
        <hr class="line" />
        <div className="husInformasjon">
          <p>Bruksareal</p>
          <p style={{ color: "#ff4d5b" }}>{allValues.usableArea} m2</p>
        </div>
        <hr class="line" />
        <div className="husInformasjon">
          <p>Tomt</p>
          <p style={{ color: "#ff4d5b" }}>{allValues.grossArea} m2</p>
        </div>
        <hr class="line" />
        <div className="husInformasjon">
          <p>Byggeår</p>
          <p style={{ color: "#ff4d5b" }}>{allValues.buildYear}</p>
        </div>
        <hr class="line" />
        <div className="husInformasjon">
          <p>Soverom</p>
          <p style={{ color: "#ff4d5b" }}>{allValues.numberOfBedrooms}</p>
        </div>
        <hr class="line" />
        <div className="husInformasjon">
          <p>Etasje(r)</p>
          <p style={{ color: "#ff4d5b" }}>{allValues.numberOfFloors}</p>
        </div>
        <hr class="line" />

        <h2 className="h2påBoligverdiInfo" style={{ marginTop: "50px" }}>
          Hvordan kommer vi frem til denne prisen?
        </h2>

        <p>
          Det er viktig å fastslå at en estimert verdi svært sjelden vil
          tilsvare en faktisk markedsverdi. I Bulder benytter vi en algoritme
          fra en underleverandør for å estimere verdien på et objekt. Den tar
          bakgrunn i kjente opplysninger om den spesifikke boligen, tidligere
          salgspriser og opplysninger om det lokale boligmarkedet.
        </p>
        <p>
          I bunn og grunn ligger det tre hovedfaktorer som avgjør
          verdifastsettelsen:
        </p>
        <ol className="boligverdiInfo-ol">
          <li>
            <p>
              Markedsverdi, altså den verdien som boligen mest sannsynlig vil
              bli solgt for.
            </p>
          </li>
          <li>
            <p>
              Usikkerhet, hvilken grad av forhåndsregler vi tar for
              usikkerhetsmarginen i algoritmen.
            </p>
          </li>
          <li>
            <p>
              Godkjent verdi er en nedjustert markedsverdi i hensyn av
              usikkerhet.
            </p>
          </li>
        </ol>
        <p>
          Bulder bruker da godkjent verdi ved søknad om boliglån. Det er fullt
          mulig å utfordre denne verdien med en godkjent e-takst. Dersom
          boligverdien stiger etter e-takst, vil denne legges til grunn som ny
          godkjent verdi.
        </p>

        <div className="boligverdiInfo-buttons-grid">
          <button type="submit" className="boligverdiInfo-søk-om-lån">
            Søk om lån
          </button>
          <button type="submit" className="boligverdiInfo-sjekk-rente">
            Sjekk renten du kan få
          </button>
        </div>

        <div className="boligverdiInfo-neste-prisantydning">
          <a href="/email" className="boligverdiInfo-neste-prisantydning-link">
            Gi meg beskjed ved neste prisantydning
          </a>
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
    </div>
  );
};

export default BoligverdiInfo;
