import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard } from "./scenes";
import moment from "moment";
import styles from "./App.css";
import * as firebase from "firebase";
import fire from "./firebase";
import Login from "./scenes/Login/Login";
import SignUp from "./scenes/SignUp/SignUp";
import Navigation from "./components/Navigation/Navigation";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from "react-router-dom";

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
        userEmailValue: "",
        isLoggedIn: false,
        userFirstName: "",
        userPicture: null,
        userMealsArray: [],
        userScheduledMealsArray: [],
        newMealId: "",
        userId: ""
      }
    };
  }
  getEmailValue = email => {
    console.log(this.state);
    this.setState({
      user: {
        ...this.state.user,
        userEmailValue: email
      }
    });
  };
  getFirstNameValue = name => {
    this.setState({
      user: {
        ...this.state.user,
        userFirstName: name
      }
    });
  };
  getUserIdFromSignUp = userId => {
    this.setState({
      user: {
        ...this.state.user,
        userId: userId
      }
    });
  };
  getMealsArrayFromFireBase() {
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
  }
  getScheduledMealsFromFirebase() {
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
  componentWillMount() {
    // this.authListener();
    this.getMealsArrayFromFireBase();
    this.getScheduledMealsFromFirebase();
  }
  componentWillUnmount() {
    firebase
      .database()
      .ref("mealsArray")
      .off("value");
  }

  // authListener() {
  //   fire.auth().onAuthStateChanged(user => {
  //     user ? this.setState({ user }) : this.setState({ user: null });
  //   });
  // }
  changeIsLoggedInState = () => {
    console.log(this.state.user.isLoggedIn);

    this.setState(
      {
        user: {
          ...this.state.user,
          isLoggedIn: !this.state.isLoggedIn
        }
      },
      () => {
        console.log(this.state.user.isLoggedIn);
        console.log(this.state.user);
      }
    );
  };

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
    return (
      <Router>
        <div className={appWrapper}>
          <Navigation
            isLoggedIn={this.state.user.isLoggedIn}
            userFirstName={this.state.user.userFirstName}
            userPicture={this.state.user.userPicture}
            changeIsLoggedInState={this.changeIsLoggedInState}
          />
          <Switch>
            <Route exact path="/dashboard">
              <DashBoard
                mealsArray={this.state.user.userMealsArray}
                scheduledMealsArray={this.state.user.userScheduledMealsArray}
                updateMealId={this.updateMealId}
                newMealId={this.state.user.newMealId}
                addMealToSchedule={this.addMealToSchedule}
                addToMealsArray={this.addToMealsArray}
                setDate={this.setDate}
                dateProps={this.state.todayFullDate}
              />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/sign-up">
              <SignUp
                setEmailState={this.getEmailValue}
                setIdState={this.getUserIdFromSignUp}
                setUserNameState={this.getFirstNameValue}
                changeIsLoggedInState={this.changeIsLoggedInState}
              />
            </Route>
            <Route exact path="/profile" />
          </Switch>
          <Redirect exact from="/" to="/dashboard" />
        </div>
      </Router>
    );
  }
}

export default App;
