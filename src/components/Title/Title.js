import React from "react";
import { planerTitle } from "./Title.module.css";

function Title({ title, children }) {
  const content = title || children;
  return <h1 className={planerTitle}>{content}</h1>;
}

export default Title;
