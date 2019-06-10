import React, { useState } from "react";
import styles from "./DayAndCaloriesNav.module.css";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import moment from "moment";

const {
  mainContainer,
  arrowLeft,
  arrowRight,
  selectedDay,
  caloriesBox,
  dateAndCaloriesBox
} = styles;

function DayAndCaloriesNav(props) {
  const [todayFullDate, setNewDate] = useState(moment().format("L"));
  const [dayName, setNewDay] = useState(moment().format("dddd"));

  let thisDay = moment();
  let thisDayForChanging = thisDay.clone();

  function addDay() {
    thisDayForChanging = thisDayForChanging.add(1, "days");
    let formatToDayName = thisDayForChanging.format("dddd");
    let formatToDate = thisDayForChanging.format("L");
    return { formatToDayName, formatToDate };
  }
  function subtractDay() {
    thisDayForChanging = thisDayForChanging.subtract(1, "days");
    let formatToDayName = thisDayForChanging.format("dddd");
    let formatToDate = thisDayForChanging.format("L");
    return { formatToDayName, formatToDate };
  }

  return (
    <div className={mainContainer}>
      <span className={arrowLeft}>
        <KeyboardArrowLeft
          fontSize="large"
          color="inherit"
          onClick={() => {
            console.log(subtractDay());
          }}
        />
      </span>
      <span className={dateAndCaloriesBox}>
        <span className={selectedDay}>
          <span>{dayName}</span>
          <span>{todayFullDate}</span>
        </span>
        <span className={caloriesBox}>302 Kcal</span>
      </span>
      <span className={arrowRight}>
        <KeyboardArrowRight
          fontSize="large"
          color="inherit"
          onClick={() => {
            console.log(addDay());
          }}
        />
      </span>
    </div>
  );
}

export default DayAndCaloriesNav;
