import React from "react";
import { DayAndCaloriesNav, Button } from "../../components";
import { Clear } from "@material-ui/icons";
import styles from "./DayView.module.css";
import { makeStyles } from "@material-ui/core/styles";

const { buttonWrapper, dayViewWrapper, dayNav, closeButton } = styles;
const useStyles = makeStyles({
  closeButton: {
    color: "white"
  }
});

// addMealToSchedule={props.addMealToSchedule}       *****    propsy do przekazania do formularza
//       addToMealsArray={props.addToMealsArray}

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
        <button
          onClick={() => {
            props.addToMealsArray({ Paulina: "trolololo" }); ///ta metoda dodaje do localStorage obiekt, docelowo zamiast Paulina trolololo ma być obiekt zwrócony przez formularz :D
          }}
        >
          DODAJ DO LOCAL
        </button>
      </div>
    </div>
  );
}
export default DayView;
