import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard } from "./scenes";
import moment from "moment";
import styles from "./App.css";
import * as firebase from "firebase";
import fire from "./firebase";
import Login from "./scenes/Login/Login";
import Navigation from "./components/Navigation/Navigation";

const { appWrapper } = styles;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayFullDate: moment(),
      newMealId: "",
      mealsArray: [],
      scheduledMealsArray: [],
      user: {
        isLoggedIn: false,
        userFirstName: "",
        userPicture: null,
        userMealsArray: [],
        userScheduledMealsArray: []
      }
    };
  }

  componentWillMount() {
    // this.authListener();
    firebase
      .database()
      .ref("mealsArray")
      .on("value", snapshot => {
        const mealsListObject = snapshot.val() || [];
        let mealsListArray = Object.values(mealsListObject).map(entry => {
          return { ...entry };
        });
        this.setState(
          {
            mealsArray: mealsListArray
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
        const scheduledMealsList = snapshot.val() || [];
        let scheduledMealsListArray = Object.entries(scheduledMealsList).map(
          entry => {
            const [id, meal] = entry;
            return {
              ...meal,
              id
            };
          }
        );
        this.setState(
          {
            scheduledMealsArray: scheduledMealsListArray
          },
          () => {}
        );
      });
  }
  componentWillUnmount() {
    firebase
      .database()
      .ref("mealsArray")
      .off("value");
  }

  authListener() {
    fire.auth().onAuthStateChanged(user => {
      user ? this.setState({ user }) : this.setState({ user: null });
    });
  }

  setDate = date => {
    this.setState({ todayFullDate: date });
  };

  addToMealsArray = mealObject => {
    this.setState(
      { mealsArray: [...this.state.mealsArray, mealObject] },
      () => {
        let { calories, id, name, type } = mealObject;
        let firebaseMeal = { calories, id, name, type };
        firebase
          .database()
          .ref("mealsArray")
          .push(firebaseMeal);
      }
    );
  };

  addMealToSchedule = mealObjectToSchedule => {
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
    // user: {
    //   isLoggedIn: false,
    //   userFirstName: "Witaj użytkowniku",
    //   userPicture: null,
    //   userMealsArray: [],
    //   userScheduledMealsArray: [],
    return (
      <div className={appWrapper}>
        <Navigation
          isLoggedIn={this.state.user.isLoggedIn}
          userFirstName={this.state.user.userFirstName}
          userPicture={this.state.user.userPicture}
        />
        {this.state.user ? (
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
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default App;
