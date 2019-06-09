import React from "react";
import "./App.css";
import DayAndCaloriesNav from "./components/DayAndCaloriesNav";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";

function App() {
  return (
    <div className="App">
      <DayAndCaloriesNav />
      <KeyboardArrowLeft fontSize="large" color="primary" />
    </div>
  );
}

export default App;
