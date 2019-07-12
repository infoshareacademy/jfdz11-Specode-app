import React, { Fragment } from "react";
import { MyCalendar, LineChart } from "../../components";

function DashBoard(props) {
  return (
    <Fragment>
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
    </Fragment>
  );
}

export default DashBoard;
