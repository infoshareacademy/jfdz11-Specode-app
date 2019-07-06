import React from "react";
import { MyCalendar } from "../../components";

function DashBoard(props) {
  return (
    <MyCalendar
      addMealToSchedule={props.addMealToSchedule}
      addToMealsArray={props.addToMealsArray}
      setDate={props.setDate}
      dateProps={props.dateProps}
    />
  );
}

export default DashBoard;
