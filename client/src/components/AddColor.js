import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../utils/axiosWithAuth";

//initial state to clear form
const initialColor = {
    color: "",
    hex: "#000000",
  };

export const AddColor = ({ updateColors }) => {
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
       updateColors(res.data)
       setAddColor({
           color: "",
           hex: "#000000"
       })
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
                  <legend>add color</legend>
      <form onSubmit={handleSubmit}>
      <label>
            color name:
        <input
          type="text"
          name="color"
          minLength="3"
          onChange={changeHandler}
          placeholder="color name"
          value={addColor.color}
        /></label>

        <div className="baseline" />
        <label>
            select color:
        <input
          type="color"
          name="hex"
          onChange={changeHandler}
            placeholder="#000000"
         value={addColor.hex}
        />        </label>
        <div className="baseline" />
        <div className="button-row">
        <button type="submit">Add Color</button>
</div>
      </form>
        </div>
    )
};

export default AddColor;