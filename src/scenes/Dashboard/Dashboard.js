import React, { Fragment } from "react";
import { MyCalendar } from "../../components";

function DashBoard(props) {
  return (
    <Fragment>
      {props.getAvatarUrl}
      <MyCalendar
        mealsArray={props.mealsArray}
        updateMealId={props.updateMealId}
        newMealId={props.newMealId}
        addMealToSchedule={props.addMealToSchedule}
        addToMealsArray={props.addToMealsArray}
        setDate={props.setDate}
        dateProps={props.dateProps}
        scheduledMealsArray={props.scheduledMealsArray}
      />
    </Fragment>
  );
}

export default DashBoard;
