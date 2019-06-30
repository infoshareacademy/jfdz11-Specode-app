import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard, DayView } from "./scenes";
import moment from "moment";
import styles from "./App.css";

function App() {
  const [todayFullDate, setDate] = useState(moment());
  const { dayViewWrapper, dashBoardWrapper, appWrapper } = styles;

  return (
    <div className={appWrapper}>
      <div className={dayViewWrapper}>
        <DayView setDate={setDate} dateProps={todayFullDate} />
      </div>
      <DashBoard setDate={setDate} dateProps={todayFullDate} />
    </div>
  );
}

export default App;
