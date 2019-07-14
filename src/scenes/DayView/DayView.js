import React from "react";
import { DayAndCaloriesNav, MealForm } from "../../components";
import { Clear } from "@material-ui/icons";
import styles from "./DayView.module.css";
import { makeStyles } from "@material-ui/core/styles";
import { PieChart } from "../../components";
import moment from 'moment';

const {
  buttonWrapper,
  dayViewWrapper,
  dayNav,
  closeButton,
  pieContainer,
  dayViewComponents
} = styles;
const useStyles = makeStyles({
  closeButton: {
    color: "white"
  }
});

function DayView(props) {
  const scheduledMealsList = JSON.parse(window.localStorage.getItem('scheduledMealsList'));
  const filteredScheduledMealsList = scheduledMealsList.filter((meal) => {
    return moment(meal.date).format('YYYY-MM-DD') === moment(props.dateProps).format('YYYY-MM-DD')
  })

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
        <div className={buttonWrapper}>
          <div>
            Posilki:
            <div>
              {
                filteredScheduledMealsList.map(meal => <div>{meal.name}</div>)
              }
            </div>
          </div>
          <MealForm
            dateProps={props.dateProps}
            addMealToSchedule={props.addMealToSchedule}
            updateMealId={props.updateMealId}
            newMealId={props.newMealId}
            addToMealsArray={props.addToMealsArray}
            mealsArray={props.mealsArray}
          />
        </div>
        <div className={pieContainer}>
          <PieChart 
          dateProps={props.dateProps}/>
        </div>
      </div>
    </div>
  );
}
export default DayView;
