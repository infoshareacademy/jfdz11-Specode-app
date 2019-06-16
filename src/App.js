import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard, DayView } from "./scenes";

function App() {
  return (
    <div className="App">
      <DayView />
      {/* <DashBoard /> */}
    </div>
  );
}

export default App;
