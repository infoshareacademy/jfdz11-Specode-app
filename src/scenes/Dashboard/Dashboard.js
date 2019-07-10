import React from "react";
import { MyCalendar } from "../../components";

function DashBoard(props) {
  return (
    <MyCalendar
      mealsArray={props.mealsArray}
      updateMealId={props.updateMealId}
      newMealId={props.newMealId}
      addMealToSchedule={props.addMealToSchedule}
      addToMealsArray={props.addToMealsArray}
      setDate={props.setDate}
      dateProps={props.dateProps}
    />
  );
}

export default DashBoard;
