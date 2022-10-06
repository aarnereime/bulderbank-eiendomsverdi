// server/index.js

const app = require("express");
const axios = require("axios");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3001;

//webapps-api.test.bulderbank.tech/Edv/getedvtoken

let accessTokenKey = "";
let apiInfo = "";

const accessTokenURL =
  "https://webapps-api.test.bulderbank.tech/Edv/getedvtoken";

const axios = require("axios");

const api_key = "";

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
getApiKey();


//Henter ut info fra EDV API
const getEindomsVerdiAPI = async () => {
  try {
    await getApiKey();
    const resp = await axios.get(
      "https://api.eiendomsverdi.no/realproperty/v1/RealEstates/3019/132/1065/0/24/attributes",
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
  res.json({ apiInfo });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});




url = "https://webapps-api.test.bulderbank.tech/Edv/getedvtoken"

dotenv.config();
const key = process.env.REACT_APP_TOKEN;

const options = {
  headers: {
    
    'Authorization': `Basic ${key}`
  }
};

axios.get(url, options)
  .then(res=> {
    console.log(res.data.accessToken)
    key = res.data.accessToken;
  })
  .catch(err=> console.log(err));

/*
url = "https://api.eiendomsverdi.no/realproperty/v1/RealEstates/3019/132/1065/0/24/attributes"

options = {
  headers: {
    'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik1qZzBSakkxUWpBek1UVkNNVFEwUlVVNE1qQkdRVU00TVRJNE5qSkdPRVkwT0RNMU9FVTJNQSJ9.eyJodHRwczovL2VpZW5kb21zdmVyZGkubm8vZXZVc2VySWQiOjU2NjMsImh0dHBzOi8vZWllbmRvbXN2ZXJkaS5uby9ldkNsaWVudE5hbWUiOiJCdWxkZXIgQmFuayIsImh0dHBzOi8vZWllbmRvbXN2ZXJkaS5uby9ldlBlcm1pc3Npb25zIjpbInJlYWxwcm9wZXJ0eTpvd25lciIsInJlYWxwcm9wZXJ0eTpyZWFsZXN0YXRlIiwicmVhbHByb3BlcnR5OmhvdXNpbmdjb29wZXJhdGl2ZSIsInJlYWxwcm9wZXJ0eTpzcGVjaWFsY29uc3RyYWludHMiLCJyZWFscHJvcGVydHk6bW9ydGdhZ2UiLCJyZWFscHJvcGVydHk6ZW52aXJvbm1lbnRhbCIsInJlYWxwcm9wZXJ0eTpsYW5kcmVnaXN0cnkiXSwiaXNzIjoiaHR0cHM6Ly9sb2dpbi5laWVuZG9tc3ZlcmRpLm5vLyIsInN1YiI6Ilp4U3BoREhGWm9vbzRTWllFOHBFek94RkxJYVBhS1NnQGNsaWVudHMiLCJhdWQiOiJodHRwczovL2FwaS5laWVuZG9tc3ZlcmRpLm5vIiwiaWF0IjoxNjY1MDQ0ODk4LCJleHAiOjE2NjUxMzEyOTgsImF6cCI6Ilp4U3BoREhGWm9vbzRTWllFOHBFek94RkxJYVBhS1NnIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIiwicGVybWlzc2lvbnMiOltdfQ.IdaZF6xRAFWdm5-5TwrkIzcp-h3oUeE41Fq6OyMsD_hOHqq2DsV0EJcwq92Cw-8eurmkmM4LhfdJG2SdY7Ne5o1W4VO0EhIV5KfF---Dz9GFj78yA9fr1yFKsv62cEvKmVgG1SHQb9Z70OzRcgQBskE2-nBpQ7t42lXxSR4keoV_V0B0SVKQBh6CYniPgYqBAay2lVmH90lfVYlwTjPGdzXVZC12ZVPcVeGRQMH0d1pBcuqnvcRTbxc3hpEICqS1PNVzeK7pJmsDueNZ3dvER_W83SDPEb6LZUsQ8OUIFOkdewlMnGy-Tmzcj6TFF-atsN67WuIGwq-pSJR-uDxYjA`
  }
};

axios.get(url, options)
  .then(res=> console.log(res.data))
  .catch(err=> console.log(err))
*/