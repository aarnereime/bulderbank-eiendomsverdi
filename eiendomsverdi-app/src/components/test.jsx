import React, { useState, useEffect } from "react";
import axios from "axios";

const test = () => {
  const [loading, setLoading] = useState(true);

  const [allValues, setAllValues] = useState({
    firstname: "",
    // lastname: "",
    // gender: "",
  });

  // useEffect(() => {
  //   const loadData = async () => {
  //     const response = await fetch("https://api.randomuser.me/");
  //     const data = await response.json();
  //     setAllValues({
  //       ...allValues,
  //       firstname: data.results[0].name.first,
  //       lastname: data.results[0].name.last,
  //       gender: data.results[0].gender,
  //     });
  //     setLoading(false);
  //   };

  //   loadData();
  // }, []);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api")
      .then((response) => {
        setAllValues({
          firstname: response.data.apiInfo.data.address.streetName,
          // lastname: response.data.data.address.streetLetter,
          // gender: response.data.data.address.municipality,
        });
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? <div>Loading...</div>: <div>Hello! {allValues.firstname} </div>}
    </div>
  );
};

export default test;
