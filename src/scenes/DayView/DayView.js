import React, { Fragment } from "react";
import { DayAndCaloriesNav, Button } from "../../components";

import styles from "./DayView.module.css";

const { buttonWrapper, dayViewWrapper, dayNav } = styles;

function DayView(props) {
  return (
    <div className={dayViewWrapper}>
      <Fragment className={dayNav}>
        <DayAndCaloriesNav
          setDate={props.setDate}
          dateProps={props.dateProps}
        />
      </Fragment>
      <div className={buttonWrapper}>
        <Button color="blue" text="Breakfast">
          {props.text}
        </Button>
        <Button text="Dinner">{props.text}</Button>
        <Button text="Supper">{props.text}</Button>
      </div>
    </div>
  );
}
export default DayView;
