import React, { useState, useEffect } from "react";
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
  // let thisDay = moment();
  // let thisDayForChanging = thisDay.clone();

  // function addDay() {
  //   thisDayForChanging = thisDayForChanging.add(1, "days");
  //   let formatToDayName = thisDayForChanging.format("dddd");
  //   let formatToDate = thisDayForChanging.format("L");
  //   return { formatToDayName, formatToDate };
  // }
  // function subtractDay() {
  //   thisDayForChanging = thisDayForChanging.subtract(1, "days");
  //   let formatToDayName = thisDayForChanging.format("dddd");
  //   let formatToDate = thisDayForChanging.format("L");
  //   return { formatToDayName, formatToDate };
  // }
  const [todayFullDate, setDate] = useState(moment());
  useEffect(() => {
    console.log("Witajcie!");
  }, []);
  //hmm trzeba tak jakoś zrobić żeby nie zmieniać formatu state na klika a żeby był przekazany tam z formatem
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
          <span>{todayFullDate.format("L")}</span>
        </span>
        <span className={caloriesBox}>3021 Kcal</span>
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
