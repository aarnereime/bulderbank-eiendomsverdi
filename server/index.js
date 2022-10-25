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
let apiInfo = "";
let firstname = "";

let address = "";
let zipcode = "";

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
    console.error("apikey")
    console.error(error);
  }
};


let cadastre = "";
let pNr = "";

app.post("/pNr", function (req, res) {
  pNr = req.body.pNr;
  getEindomsVerdiAPI();
  res.redirect("/api");

});


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
    address = `${resp.data.data.address.streetName} ${resp.data.data.address.streetNumber}`;
    zipcode = resp.data.data.address.postOffice.code;
    apiInfo = resp.data;
    
  } catch (error) {
    console.error(error);
  }
};



// Henter ut fornavn på eier av bolig
const getFirstnameAPI = async () => {
  try {
    await getCadastre();
    const resp = await axios.get(
      `https://api.eiendomsverdi.no/realproperty/v1/RealEstates/${cadastre.kNr}/${cadastre.gNr}/${cadastre.bNr}/${cadastre.fNr}/${cadastre.sNr}/owners`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + accessTokenKey,
        },
      }
    );
    firstname = resp.data.data[0];
  } catch (error) {
    console.error(error);
  }
};


property_png = "";
//Henter ut info fra EDV API
const googleImage = async () => {
  try {
    await getEindomsVerdiAPI();
    const resp = await axios({
        url : `https://webapps-api.test.bulderbank.tech/Google/map`,
        method: "post",
        data: {
            address : address,
            postalCode : zipcode,
            zoom : 20,
            type : 1,
            size : 640,
            format : "png"
        }
      }
    );
    property_png = resp.data;
  } catch (error) {
    console.error(error);
  }
};

//googleImage();


app.get("/api", (req, res) => {
  getEindomsVerdiAPI();
  getFirstnameAPI();
  res.send({ apiInfo, firstname });
});

app.get("/image",(req, res) => {
  res.send({property_png});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});