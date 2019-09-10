import React, { Fragment } from "react";
import { MyCalendar } from "../../components";
import DateContextProvider from "../../contexts/dateContext";

function DashBoard(props) {
  return (
<<<<<<< HEAD
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
=======
    <DateContextProvider>
      <Fragment>
        <MyCalendar />
      </Fragment>
    </DateContextProvider>
>>>>>>> MarcinJarowskiFirebase
  );
}

export default DashBoard;
