import React from "react";
import { DayAndCaloriesNav, MealForm, PieChart } from "../../components";
import { Clear } from "@material-ui/icons";
import styles from "./DayView.module.css";
import { makeStyles } from "@material-ui/core/styles";

const {
  mealFormWrapper,
  dayViewWrapper,
  dayNav,
  closeButton,
  dayViewComponents
} = styles;
const useStyles = makeStyles({
  closeButton: {
    color: "white"
  }
});

function DayView(props) {
  const classes = useStyles();
  return (
    <div className={dayViewWrapper}>
      <span className={closeButton}>
        <Clear
          className={classes.closeButton}
          onClick={() => props.setModalOpenState(false)}
        />
      </span>
      <span className={dayNav}>
        <DayAndCaloriesNav
          setDate={props.setDate}
          dateProps={props.dateProps}
        />
      </span>
      <div className={dayViewComponents}>
        <div className={mealFormWrapper}>
          <MealForm
            dateProps={props.dateProps}
            addMealToSchedule={props.addMealToSchedule}
            updateMealId={props.updateMealId}
            newMealId={props.newMealId}
            addToMealsArray={props.addToMealsArray}
            mealsArray={props.mealsArray}
          />
        </div>
        <PieChart />
      </div>
    </div>
  );
}
export default DayView;
