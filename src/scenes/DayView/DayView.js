import React, { Fragment } from "react";
import { DayAndCaloriesNav, Button } from "../../components";
import { Clear } from "@material-ui/icons";
import styles from "./DayView.module.css";
import { makeStyles } from "@material-ui/core/styles";

const { buttonWrapper, dayViewWrapper, dayNav, closeButton } = styles;

//todo: data w state i przekazanie do buttona, console.log daty i ktory huzik klikniety
//formularz dodawania (przekazuje nazwe guzika i po dodaniu zmienia np kolor guzika)
// w formularzu inputy ktore tworza obiekt i dodaja go do local storage
// jezeli cos w localsie jest to niech to wyswietli buttony na zielono / albo wartosc bo bedzie migac
//na kalendarzu fajnie by bylo jakby byly wyswietlane gdzie mamy posilki juz dodane (props kalendarza to events)
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
      </div>
    </div>
  );
}
export default DayView;
