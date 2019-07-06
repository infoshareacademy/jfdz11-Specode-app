import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard } from "./scenes";
import moment from "moment";
import styles from "./App.css";
import MealsLocalStorage from "./components/MealsLocalStorage/MealsLocalStorage";
const { appWrapper } = styles;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayFullDate: moment(),
      mealsArray: JSON.parse(localStorage.getItem("mealsList")) || [],
      scheduledMealsArray:
        JSON.parse(localStorage.getItem("scheduledMealsList")) || []
    };
  }
  componentDidUpdate() {
    console.log(this.state.mealsArray);
  }
  setDate = date => {
    this.setState({ todayFullDate: date });
  };

  addToMealsArray = mealObject => {
    console.log([...this.state.mealsArray]);
    this.setState(
      { mealsArray: [...this.state.mealsArray, mealObject] },
      () => {
        localStorage.setItem(
          "mealsList",
          JSON.stringify(this.state.mealsArray)
        );
      }
    );
  };

  addMealToSchedule = mealObjectToSchedule => {
    console.log(mealObjectToSchedule);
    this.setState(
      {
        scheduledMealsArray: [
          ...this.state.scheduledMealsArray,
          mealObjectToSchedule
        ]
      },
      () => {
        localStorage.setItem(
          "scheduledMealsList",
          JSON.stringify(this.state.scheduledMealsArray)
        );
      }
    );
  };

  render() {
    return (
      <div className={appWrapper}>
        <MealsLocalStorage />
        <DashBoard
          addMealToSchedule={this.addMealToSchedule}
          addToMealsArray={this.addToMealsArray}
          setDate={this.setDate}
          dateProps={this.state.todayFullDate}
        />
      </div>
    );
  }
}

export default App;
