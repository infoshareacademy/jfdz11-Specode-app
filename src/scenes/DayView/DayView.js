import React, { Fragment } from "react";
import { DayAndCaloriesNav, Button } from "../../components";
import { Clear } from "@material-ui/icons";
import styles from "./DayView.module.css";
import { makeStyles } from "@material-ui/core/styles";

const { buttonWrapper, dayViewWrapper, dayNav, closeButton } = styles;

//todo: data w state i przekazanie do buttona, console.log daty i ktory huzik klikniety
//zamkniecie modala
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
      <Fragment className={dayNav}>
        <DayAndCaloriesNav
          setDate={props.setDate}
          dateProps={props.dateProps}
        />
      </Fragment>
      <div className={buttonWrapper}>
        <Button padding="20px" text="Śniadanie">
          {props.text}
        </Button>
        <Button text="Obiad">{props.text}</Button>
        <Button text="Kolacja">{props.text}</Button>
      </div>
    </div>
  );
}
export default DayView;
