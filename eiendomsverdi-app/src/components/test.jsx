import React, { useState, useEffect } from "react";
import axios from "axios";

const test = () => {
  const [loading, setLoading] = useState(true);

  const [allValues, setAllValues] = useState({
    firstname: "",
    lastname: "",
    gender: "",
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
      .get("https://api.randomuser.me/")
      .then((response) => {
        setAllValues({
          firstname: response.data.results[0].name.first,
          lastname: response.data.results[0].name.last,
          gender: response.data.results[0].gender,
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
      {loading ? <div>Loading...</div>: <div>Hello! {allValues.firstname} {allValues.lastname}, your gender is {allValues.gender}</div>}
    </div>
  );
};

export default test;
