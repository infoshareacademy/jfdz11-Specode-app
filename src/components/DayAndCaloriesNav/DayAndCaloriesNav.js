import React, { useState, useEffect } from "react";
import styles from "./DayAndCaloriesNav.module.css";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import moment from "moment";
import "moment/locale/pl";

const {
  mainContainer,
  arrowLeft,
  arrowRight,
  selectedDay,
  caloriesBox,
  dateAndCaloriesBox
} = styles;

function DayAndCaloriesNav(props) {
  const [todayFullDate, setDate] = useState(moment());
  useEffect(() => {
    console.log("Witajcie!");
  }, []);
  return (
    <div className={mainContainer}>
      <span className={arrowLeft}>
        <KeyboardArrowLeft
          fontSize="large"
          color="inherit"
          onClick={() => {
            let x = todayFullDate.clone().subtract(1, "days");
            setDate(x);
          }}
        />
      </span>
      <span className={dateAndCaloriesBox}>
        <span className={selectedDay}>
          <span>{todayFullDate.format("dddd")}</span>
          <span>{todayFullDate.format("ll")}</span>
        </span>
        <span className={caloriesBox}>kcal</span>
      </span>
      <span className={arrowRight}>
        <KeyboardArrowRight
          fontSize="large"
          color="inherit"
          onClick={() => {
            setDate(todayFullDate.clone().add(1, "days"));
          }}
        />
      </span>
    </div>
  );
}

export default DayAndCaloriesNav;
