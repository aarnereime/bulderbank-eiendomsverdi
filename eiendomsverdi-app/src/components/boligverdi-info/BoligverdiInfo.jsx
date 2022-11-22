import React from "react";
import "./boligverdiInfo.css";
import { useLocation, useNavigate } from "react-router-dom";

const BoligverdiInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const fødselsnummer = location.state.pNr;
  const apiValues = location.state.apiValues;
  const index = location.state.idx;

  const allValues = {
    primaryArea: apiValues.apiInfo[index].data.attributes.primaryArea.value,
    usableArea: apiValues.apiInfo[index].data.attributes.usableArea.value,
    grossArea: apiValues.apiInfo[index].data.attributes.grossArea.value,
    buildYear: apiValues.apiInfo[index].data.attributes.buildYear,
    numberOfBedrooms: apiValues.apiInfo[index].data.attributes.numberOfBedrooms,
    numberOfFloors: apiValues.apiInfo[index].data.attributes.numberOfFloors,
  };
  const address = apiValues.apiInfo[index].data.address;

  // Parameternavn for detalje listen
  const infoParameter = [
    "Primærrom",
    "Bruksareal",
    "Tomt",
    "Byggeår",
    "Soverom",
    "Etasje(r)",
  ];

  // Mapper allValues, looper gjennom alle verdier og viser disse
  // på nettsiden med korrespondernde navn fra listen infoParameter
  const displayInfo = (allValues) =>
    Object.values(allValues).map((value, index) => (
      <div key={index}>
        <div className="husInformasjon">
          <p>{infoParameter[index]}</p>
          {value == null ? (
            <p>Ingen informasjon å hente</p>
          ) : index <= 2 ? (
            <p>{value} m2</p>
          ) : (
            <p>{value}</p>
          )}
        </div>
        <hr className="line" />
      </div>
    ));

  const toBoligverdi = () => {
    navigate("/boligverdi", {
      state: { pNr: fødselsnummer, apiValues: apiValues },
    });
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
        <div className="infoSide-husContainer">
          <img
            className="bildeAvHus-infoSide"
            src={`https://webapps-api.test.bulderbank.tech/Google/map?Address=${address.streetName}
                -${address.streetNumber}
                -${address.streetLetter}
                -${address.postOffice.code}
                -${address.postOffice.name}}
                %203&maptype=1&zoom=20`}
          />
          <div className="infoSide-bildeLayer">
            <div className="infoSide-bildeAddresse">
              {address.streetName} {address.streetNumber}
              {address.streetLetter},<br></br>
              {address.postOffice.code}, {address.postOffice.name}
            </div>
            <div className="infoSide-estimertPris">
              Estimert boligverdi: <br />
              <span className="pris">{"100 000 000"}</span>
            </div>
          </div>
        </div>

        <h2 className="h2påBoligverdiInfo">Detaljer</h2>

        {/* Viser informasjon om bolig */}
        {displayInfo(allValues)}

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
