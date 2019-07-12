import React from "react";
import { MyCalendar, LineChart, Title } from "../../components";

function DashBoard(props) {
  return (
    <div>
      <Title>Planer żywieniowy</Title>
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
