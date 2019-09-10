import React, { useContext } from "react";
import styles from "./DayAndCaloriesNav.module.css";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { DateContext } from "../../contexts/dateContext";

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
  const { date, changeDate } = useContext(DateContext);
  // console.log(dateProps);
  return (
    <div className={mainContainer}>
      <span className={arrowLeft}>
        <KeyboardArrowLeft
          fontSize="large"
          color="inherit"
          onClick={() => {
            let prevDate = date.clone().subtract(1, "days");
            changeDate(prevDate);
          }}
        />
      </span>
      <span className={dateAndCaloriesBox}>
        <span className={selectedDay}>
          <span>{date.format("dddd")}</span>
          <span>{date.format("ll")}</span>
        </span>
        <span className={caloriesBox}>kcal</span>
      </span>
      <span className={arrowRight}>
        <KeyboardArrowRight
          fontSize="large"
          color="inherit"
          onClick={() => {
            let nextDate = date.clone().add(1, "days");
            changeDate(nextDate);
          }}
        />
      </span>
    </div>
  );
}

export default DayAndCaloriesNav;
