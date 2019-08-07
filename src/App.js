import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard } from "./scenes";
import moment from "moment";
import styles from "./App.css";
import * as firebase from "firebase";

const { appWrapper } = styles;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayFullDate: moment(),
      newMealId: "",
      mealsArray: [],
      scheduledMealsArray: []
    };
  }

  componentDidMount() {
    firebase
      .database()
      .ref("meals")
      .on("value", snapshot => {
        const mealsList = snapshot.val();
        this.setState(
          {
            mealsArray: mealsList
          },
          () => {
            let nextMealId = this.state.mealsArray.length + 1;
            this.setState({ newMealId: nextMealId }, () => {});
          }
        );
      });
    firebase
      .database()
      .ref("scheduledMeals")
      .on("value", snapshot => {
        const mealsList = snapshot.val();
        let mealsListArray = Object.entries(mealsList).map(entry => {
          const [id, meal] = entry;
          return {
            ...meal,
            id
          };
        });
        this.setState({
          scheduledMealsArray: mealsListArray
        });
      });
  }
  componentWillUnmount() {
    firebase
      .database()
      .ref("meals")
      .off("value");
  }

  setDate = date => {
    this.setState({ todayFullDate: date });
  };

  addToMealsArray = mealObject => {
    this.setState({ mealsArray: [...this.state.mealsArray, mealObject] });
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
        let firebaseMeal = {
          ...mealObjectToSchedule,
          date: mealObjectToSchedule.date.toDate().toISOString()
        };
        firebase
          .database()
          .ref("scheduledMeals")
          .push(firebaseMeal);
      }
    );
  };

  updateMealId = () => {
    this.setState({ newMealId: this.state.newMealId + 1 });
  };

  render() {
    return (
      <div className={appWrapper}>
        <DashBoard
          mealsArray={this.state.mealsArray}
          scheduledMealsArray={this.state.scheduledMealsArray}
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
