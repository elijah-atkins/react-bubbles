import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

//initial state to clear form
const initialColor = {
    color: "",
    code: { hex: "" },
  };

export const AddColor = () => {
  const { push } = useHistory();
 //create state object using useState
 const [addColor, setAddColor] = useState(initialColor);
  //use props to set initial state


  const changeHandler = e => {
    setAddColor({
      ...addColor,
      [e.target.name]: e.target.value
    });
  }
  const handleSubmit = e => {
    e.preventDefault();
    const newColor = {
        color: addColor.color,
        code:{ hex: addColor.hex}
    }
    axiosWithAuth()
      .post(`http://localhost:5000/api/colors/`, newColor)
      .then(res => {
       console.log("AddColor.js post success:", res.data);
        push(`/BubblePage`);
      })
      .catch(err =>
        console.error(
          "AddColor.js: handleSubmit: ",
          err.message,
          err.response
        )
      );
  };
  return(
        <div className="color-form">
                  <h2>Add Color</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="color"
          onChange={changeHandler}
          placeholder="Color Name"
          value={addColor.color}
        />
        <div className="baseline" />

        <input
          type="text"
          name="hex"
          onChange={changeHandler}
          placeholder="Hex Code"
         value={addColor.hex}
        />
        <div className="baseline" />

        <button className="form-submit">Add Color</button>
      </form>
        </div>
    )
};

export default AddColor;