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
  const { setDate, dateProps } = props;

  console.log(dateProps);
  return (
    <div className={mainContainer}>
      <span className={arrowLeft}>
        <KeyboardArrowLeft
          fontSize="large"
          color="inherit"
          onClick={() => {
            let prevDate = dateProps.clone().subtract(1, "days");
            setDate(prevDate);
          }}
        />
      </span>
      <span className={dateAndCaloriesBox}>
        <span className={selectedDay}>
          <span>{dateProps.format("dddd")}</span>
          <span>{dateProps.format("ll")}</span>
        </span>
        <span className={caloriesBox}>kcal</span>
      </span>
      <span className={arrowRight}>
        <KeyboardArrowRight
          fontSize="large"
          color="inherit"
          onClick={() => {
            let nextDate = dateProps.clone().add(1, "days");
            setDate(nextDate);
          }}
        />
      </span>
    </div>
  );
}

export default DayAndCaloriesNav;
