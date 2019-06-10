import React from "react";
import styles from "./DayAndCaloriesNav.module.css";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

const {
  mainContainer,
  arrowLeft,
  arrowRight,
  selectedDay,
  caloriesBox,
  dayAndCaloriesBox
} = styles;

function DayAndCaloriesNav() {
  return (
    <div className={mainContainer}>
      <span className={arrowLeft}>
        <KeyboardArrowLeft fontSize="large" color="inherit" />
      </span>
      <span className={dayAndCaloriesBox}>
        <span className={selectedDay}>np. 13 Luty 2019</span>
        <span className={caloriesBox}>302 Kcal</span>
      </span>
      <span className={arrowRight}>
        <KeyboardArrowRight fontSize="large" color="inherit" />
      </span>
    </div>
  );
}

export default DayAndCaloriesNav;
