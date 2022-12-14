// server/index.js
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

let accessTokenKey = "";

const accessTokenURL =
  "https://webapps-api.prod.bulderbank.tech/Edv/getedvtoken";

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const api_key = process.env.REACT_APP_TOKEN;

//Henter ut access token
const getApiKey = async () => {
  try {
    const resp = await axios.get(accessTokenURL, {
      method: "GET",
      headers: {
        authorization: "Basic " + api_key,
      },
    });
    accessTokenKey = resp.data.accessToken;
  } catch (error) {
    console.error("apikey");
  }
};

//Henter ut cadastre fra EDV API
const getCadastre = async (pNr) => {
  try {
    await getApiKey();
    const resp = await axios.get(
      `https://api.eiendomsverdi.no/realproperty/v1/Owners/${pNr}/RealEstates`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + accessTokenKey,
        },
      }
    );
    cadastres = [];
    for (i = 0; i < resp.data.data.length; i++) {
      cadastres.push(resp.data.data[i].cadastre);
    }
    return cadastres;
  } catch (error) {
    console.error("lmao");
  }
};

//Henter ut info fra EDV API
const getEindomsVerdiAPI = async (pNr) => {
  try {
    const cadastres = await getCadastre(pNr);
    const apiInfo = [];
    for (const cadastre of cadastres) {
      const resp = await axios.get(
        `https://api.eiendomsverdi.no/realproperty/v1/RealEstates/${cadastre.kNr}/${cadastre.gNr}/${cadastre.bNr}/${cadastre.fNr}/${cadastre.sNr}/attributes`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + accessTokenKey,
          },
        }
      );
      // const response = await axios.post(
      //   `https://api.eiendomsverdi.no/estimate/v1/RealEstates/${cadastre.kNr}/${cadastre.gNr}/${cadastre.bNr}/${cadastre.fNr}/${cadastre.sNr}/EvEstimate`,
      //   {
      //     method: "POST",
      //     headers: {
      //       authorization: "Bearer " + accessTokenKey,
      //     },
      //   }
      // );
      // console.log(response)
      apiInfo.push(resp.data);
    }
    return apiInfo;
  } catch (err) {
    console.error(err.message);
  }
};

// Henter ut fornavn på eier av bolig
const getFirstnameAPI = async (pNr) => {
  try {
    await getCadastre(pNr);
    const resp = await axios.get(
      `https://api.eiendomsverdi.no/realproperty/v1/RealEstates/${cadastres[0].kNr}/${cadastres[0].gNr}/${cadastres[0].bNr}/${cadastres[0].fNr}/${cadastres[0].sNr}/owners`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + accessTokenKey,
        },
      }
    );
    data = resp.data.data;
    for (const val of data) {
      if (val.owner.identity == pNr) {
        firstname = val.owner;
      }
    }
    return firstname;
  } catch (error) {
    console.error("name");
  }
};

app.post("/api", async (req, res) => {
  const pNr = req.body.pNr;
  const apiInfo = await getEindomsVerdiAPI(pNr);
  const firstname = await getFirstnameAPI(pNr);
  res.send({ apiInfo, firstname });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
