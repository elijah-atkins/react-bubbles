import React, { useState } from "react";
import axiosWithAuth from "../utils/axiosWithAuth";
import { useHistory } from "react-router-dom";
import AddColor from "./AddColor";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors }) => {
  const { push } = useHistory();
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    console.log(colorToEdit);

    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
      .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then((res) => {
        updateColors([
          ...colors.filter((x) => x.id !== colorToEdit.id),
          res.data,
        ]);
        setEditing(false);
      })
      .catch((err) =>
        console.error("ColorList.js: handleSubmit: ", err.message, err.response)
      );
  };

  const deleteColor = (id) => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/${id}`)
      .then((res) => {
        updateColors(colors.filter((x) => x.id !== id));
        setEditing(false);
        push(`/BubblePage`);
      })
      .catch((err) =>
        console.error(
          "ColorList.js: handleDelete: err: ",
          err.message,
          err.response
        )
      );
  };

  return (
    <div className="colors-wrap">
          <AddColor updateColors={updateColors}/>
      <legend>colors</legend>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color.id);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <div className="color-form">
        <legend>edit color</legend>
        <form onSubmit={saveEdit}>

          <label>
            color name:
            <input
              minLength="3"
              onChange={(e) =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              type="color"
              onChange={(e) =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value },
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
        </div>
      )}

      {/* stretch - build another form here to add a color */}

    </div>
  );
};

export default ColorList;
