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
      newMealId: "",
      mealsArray: [],
      scheduledMealsArray:
        JSON.parse(localStorage.getItem("scheduledMealsList")) || []
    };
  }
  componentDidMount() {
    this.setState(
      {
        mealsArray: JSON.parse(localStorage.getItem("mealsList"))
      },
      () => {
        let nextMealId = this.state.mealsArray.length + 1;
        this.setState({ newMealId: nextMealId }, () => {
          console.log(this.state.newMealId);
          console.log("compinent did mount");
        });
      }
    );
  }

  setDate = date => {
    this.setState({ todayFullDate: date });
  };

  addToMealsArray = mealObject => {
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

  updateMealId = () => {
    this.setState({ newMealId: this.state.newMealId + 1 });
  };

  render() {
    return (
      <div className={appWrapper}>
        <MealsLocalStorage />
        <DashBoard
          updateMealId={this.updateMealId}
          newMealId={this.state.newMealId}
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
