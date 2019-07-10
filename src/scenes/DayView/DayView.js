import React from "react";
import {
  DayAndCaloriesNav,
  Button,
  MealForm,
  MealsSearch
} from "../../components";
import { Clear } from "@material-ui/icons";
import styles from "./DayView.module.css";
import { makeStyles } from "@material-ui/core/styles";

const { buttonWrapper, dayViewWrapper, dayNav, closeButton } = styles;
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
      <div className={buttonWrapper}>
        <Button padding="20px" text="Śniadanie">
          {props.text}
        </Button>
        <Button text="Obiad">{props.text}</Button>
        <Button text="Kolacja">{props.text}</Button>
        <MealForm
          updateMealId={props.updateMealId}
          newMealId={props.newMealId}
          addToMealsArray={props.addToMealsArray}
        />
      </div>
      <MealsSearch mealsArray={props.mealsArray} />
    </div>
  );
}
export default DayView;
