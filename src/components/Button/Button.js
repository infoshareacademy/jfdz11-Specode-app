import React from "react";
import styles from "./Button.module.css";

const { mealButton } = styles;

function Button(props) {
  return (
    <button
      className={mealButton}
      style={{ backgroundColor: props.color || "red" }}
    >
      {props.text}
    </button>
  );
}

export default Button;
