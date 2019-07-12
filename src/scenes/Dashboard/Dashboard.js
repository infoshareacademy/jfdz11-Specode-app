import React from "react";
import { MyCalendar, LineChart } from "../../components";

function DashBoard(props) {
  return (
    <div>
      <MyCalendar
        mealsArray={props.mealsArray}
        updateMealId={props.updateMealId}
        newMealId={props.newMealId}
        addMealToSchedule={props.addMealToSchedule}
        addToMealsArray={props.addToMealsArray}
        setDate={props.setDate}
        dateProps={props.dateProps}
      />
      <LineChart />
    </div>
  );
}

export default DashBoard;
