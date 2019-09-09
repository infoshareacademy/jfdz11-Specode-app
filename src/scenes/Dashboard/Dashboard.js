import React, { Fragment } from "react";
import { MyCalendar } from "../../components";
import DateContextProvider from "../../contexts/dateContext";

function DashBoard(props) {
  return (
    <DateContextProvider>
      <Fragment>
        <MyCalendar />
      </Fragment>
    </DateContextProvider>
  );
}

export default DashBoard;
