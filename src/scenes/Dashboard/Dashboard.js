import React from "react";
import { MyCalendar } from "../../components";

function DashBoard(props) {
  return <MyCalendar setDate={props.setDate} dateProps={props.dateProps} />;
}

export default DashBoard;
