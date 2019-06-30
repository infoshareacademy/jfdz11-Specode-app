import React from "react";
import styles from "./DayAndCaloriesNav.module.css";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";

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
  const { setDate, dateProps: todayFullDate } = props;
  return (
    <div className={mainContainer}>
      <span className={arrowLeft}>
        <KeyboardArrowLeft
          fontSize="large"
          color="inherit"
          onClick={() => {
            let prevDate = todayFullDate.clone().subtract(1, "days");
            setDate(prevDate);
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
            let nextDate = todayFullDate.clone().add(1, "days");
            setDate(nextDate);
          }}
        />
      </span>
    </div>
  );
}

export default DayAndCaloriesNav;
