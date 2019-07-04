import React from "react";
import styles from "./Button.module.css";

const { mealButton } = styles;

function Button(props) {
  return (
    <button
      className={mealButton}
      style={
        ({ backgroundColor: props.color || "white" },
        { padding: props.padding || "0" },
        { margin: props.margin || "0" })
      }
    >
      {props.text}
    </button>
  );
}

export default Button;
