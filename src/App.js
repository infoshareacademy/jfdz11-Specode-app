import React, { useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard, DayView } from "./scenes";
import moment from "moment";

function App() {
  const [todayFullDate, setDate] = useState(moment());

  return (
    <div className="App">
      <DayView setDate={setDate} dateProps={todayFullDate} />
      <DashBoard setDate={setDate} />
    </div>
  );
}

export default App;
