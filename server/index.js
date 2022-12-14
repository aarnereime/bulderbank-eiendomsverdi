// server/index.js
//imports
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const cors = require("cors");

app.use(cors());
app.use(express.json());

//localhost port
const PORT = process.env.PORT || 3001;

let accessTokenKey = "";

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
const api_key = process.env.REACT_APP_TOKEN;

//Henter ut access token
const getApiKey = async () => {
  try {
    //uses axios to get data from api.
    const resp = await axios.get("https://webapps-api.prod.bulderbank.tech/Edv/getedvtoken", {
      method: "GET",
      headers: {
        authorization: "Basic " + api_key,
      },
    });
    //get data from api call
    accessTokenKey = resp.data.accessToken;
  } catch (error) {
    console.error("apikey")
  }
};




//Henter ut cadastre fra EDV API
const getCadastre = async (pNr) => {
  try {
    //awaits respons from getAPIKey functoin()
    await getApiKey();
    //get api call to get a list of values to realestates related to a personid
    const resp = await axios.get(
      `https://api.eiendomsverdi.no/realproperty/v1/Owners/${pNr}/RealEstates`,
      {
        method: "GET",
        headers: {
          authorization: "Bearer " + accessTokenKey,
        },
      }
    );
    //loops through the properties and lists cadestre numbers.
    cadastres = [];
    for (i = 0; i < resp.data.data.length; i++){
      cadastres.push(resp.data.data[i].cadastre);
    }
    return cadastres;
  
  } catch (error) {
    console.error("lmao");
  }
};


//Henter ut info fra EDV API
const getEindomsVerdiAttributesAPI = async (pNr) => {
  try {
    //awiat a getCadastre call.
    const cadastres = await getCadastre(pNr);
    const apiInfo = [];
    //loops through the list of cadastres.
    for (const cadastre of cadastres){
      //make a get api call to get attributes of a property given the cadastre of that property.
      const resp = await axios.get(
        `https://api.eiendomsverdi.no/realproperty/v1/RealEstates/${cadastre.kNr}/${cadastre.gNr}/${cadastre.bNr}/${cadastre.fNr}/${cadastre.sNr}/attributes`,
        {
          method: "GET",
          headers: {
            authorization: "Bearer " + accessTokenKey,
          },
        }
      );
      try{
        //get api call that gets the property value of a property given the cadastre values of that property.
      const verdiresp = await axios.post(
        `https://api.eiendomsverdi.no/estimate/v1/RealEstates/${cadastre.kNr}/${cadastre.gNr}/${cadastre.bNr}/${cadastre.fNr}/${cadastre.sNr}/EvEstimate`,
        {
          method: "POST",
          headers: {
            authorization: "Bearer " + accessTokenKey,
          },
        }
      );
      console.log(verdiresp.data);
      }catch(error){console.log(error)}
      //adds property attrubutes to list.
      apiInfo.push(resp.data);
    }
    return apiInfo;
  } catch (error) {
    console.error("eiendoms");
  }
};



// Henter ut fornavn på eier av bolig
const getFirstnameAPI = async (pNr) => {
  try {
    //get api call that gets the owners of a property given the cadastres of a property.
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
    //loops through the owners
    for (const val of data) {
      //finds the firstname of the owner whos personid matches the personid entered.
      if (val.owner.identity == pNr) {
        firstname = val.owner;
      }
    }
    return firstname;
  } catch (error) {
    console.error("name");
  }
};

//gets property attributes and first name related to a personid
app.post("/api", async (req, res) => {
  const pNr = req.body.pNr;
  const apiInfo = await getEindomsVerdiAttributesAPI(pNr);
  const firstname = await getFirstnameAPI(pNr);
  res.send({ apiInfo, firstname });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});