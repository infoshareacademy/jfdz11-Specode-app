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

    this.counter = 0;

    this.state = {
      todayFullDate: moment(),
      mealsArray: [],
      scheduledMealsArray:
        JSON.parse(localStorage.getItem("scheduledMealsList")) || []
    };
  }
  componentDidMount() {
    this.setState({
      mealsArray: JSON.parse(localStorage.getItem("mealsList"))
    });
  }

  setDate = date => {
    this.setState({ todayFullDate: date });
  };

  addToMealsArray = (text, kcal, type, date) => {
    let meal = {
      name: text,
      calories: kcal,
      type,
      id: this.counter,
      date
    };
    console.log(meal);
    this.counter++;
    this.setState(
      prevState => ({
        state: [...prevState.mealsArray, meal]
      }),
      () => {
        localStorage.setItem(
          "scheduledMealsList",
          JSON.stringify(this.state.scheduledMealsArray)
        );
      }
    );

    return true;
  };

  // { mealsArray: [...this.state.mealsArray, mealObject] },
  // () => {
  //   localStorage.setItem(
  //     "mealsList",
  //     JSON.stringify(this.state.mealsArray)
  //   );
  // }
  ///ta metoda dodaje do localStorage obiekt, docelowo zamiast Paulina trolololo ma być obiekt zwrócony przez formularz :D

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
