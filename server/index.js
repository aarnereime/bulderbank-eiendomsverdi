// server/index.js
//test
const express = require("express");
const axios = require("axios");
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })
const app = express();

const PORT = process.env.PORT || 3001;

//webapps-api.test.bulderbank.tech/Edv/getedvtoken

let accessTokenKey = "";
let apiInfo = "";

const accessTokenURL =
  "https://webapps-api.test.bulderbank.tech/Edv/getedvtoken";

//require("dotenv").config();

const api_key = process.env.REACT_APP_TOKEN;
console.log(api_key)
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
    console.error(error);
  }
};

const pNr = null;
let cadastre = null;
//Henter ut cadastre fra EDV API
const getCadastre = async () => {
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
    cadastre = resp.data.data[0].cadastre;
  } catch (error) {
    console.error(error);
  }
};

//Henter ut info fra EDV API
const getEindomsVerdiAPI = async () => {
  try {
    await getCadastre();
    const resp = await axios.get(
      `https://api.eiendomsverdi.no/realproperty/v1/RealEstates/${cadastre.kNr}/${cadastre.gNr}/${cadastre.bNr}/${cadastre.fNr}/${cadastre.sNr}/attributes`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + accessTokenKey,
        },
      }
    );
    apiInfo = resp.data;
  } catch (error) {
    console.error(error);
  }
};

getEindomsVerdiAPI();


app.get("/api", (req, res) => {
  res.json({apiInfo});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
