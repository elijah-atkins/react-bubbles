import React, { useState, useEffect } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  const fetchColors = () => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/colors/`)
  // set that data to the colorList state property
      .then((res) => setColorList(res.data))
      .catch((err) => console.log(err.response));
  };
  useEffect(() => {
    fetchColors();
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
