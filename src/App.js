import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard, ProfilePage, LandingPage } from "./scenes";
import moment from "moment";
import styles from "./App.css";
import * as firebase from "firebase";
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
  logOutChangeState = () => {
    this.setState({
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
    });
  };
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
  getUserIdFromSigning = userId => {
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
  getScheduledMealsFromFirebase = userUid => {
    firebase
      .database()
      .ref("scheduledMeals/" + userUid)
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
            user: {
              ...this.state.user,
              userScheduledMealsArray: scheduledMealsListArray
            }
          },
          () => {
            this.setState({
              scheduledMealsArray: scheduledMealsListArray
            });
          }
        );
      });
  };
  componentWillUnmount() {
    firebase
      .database()
      .ref("mealsArray")
      .off("value");
  }

  changeIsLoggedInState = () => {
    this.setState({
      user: {
        ...this.state.user,
        isLoggedIn: !this.state.user.isLoggedIn
      }
    });
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
          .ref("customMeals/" + this.state.user.userId)
          .set(firebaseMeal);
      }
    );
  };

  addMealToSchedule = mealObjectToSchedule => {
    this.setState(
      {
        scheduledMealsArray: [
          ...this.state.scheduledMealsArray,
          {
            ...mealObjectToSchedule,
            date: mealObjectToSchedule.date.toDate().toISOString()
          }
        ]
      },
      () => {
        firebase
          .database()
          .ref("scheduledMeals/" + this.state.user.userId)
          .set({
            ...this.state.scheduledMealsArray
          });
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
            logOutChangeState={this.logOutChangeState}
            isLoggedIn={this.state.user.isLoggedIn}
            userFirstName={this.state.user.userFirstName}
            userPicture={this.state.user.userPicture}
            changeIsLoggedInState={this.changeIsLoggedInState}
          />
          <Switch>
            {/* <React.Fragment>
              {this.state.user.isLoggedIn === false ? (
                <Route exact path="/landing-page">
                  <LandingPage />
                </Route>
              ) : (
                <Route exact path="/dashboard">
                  <DashBoard
                    mealsArray={this.state.user.userMealsArray}
                    scheduledMealsArray={
                      this.state.user.userScheduledMealsArray
                    }
                    updateMealId={this.updateMealId}
                    newMealId={this.state.newMealId}
                    addMealToSchedule={this.addMealToSchedule}
                    addToMealsArray={this.addToMealsArray}
                    setDate={this.setDate}
                    dateProps={this.state.todayFullDate}
                  />
                </Route>
              )}
            </React.Fragment> */}
            <Route exact path="/landing-page">
              <LandingPage />
            </Route>
            <Route exact path="/dashboard">
              <DashBoard
                mealsArray={this.state.user.userMealsArray}
                scheduledMealsArray={this.state.user.userScheduledMealsArray}
                updateMealId={this.updateMealId}
                newMealId={this.state.newMealId}
                addMealToSchedule={this.addMealToSchedule}
                addToMealsArray={this.addToMealsArray}
                setDate={this.setDate}
                dateProps={this.state.todayFullDate}
              />
            </Route>
            <Route exact path="/login">
              <Login
                setIdState={this.getUserIdFromSigning}
                setUserNameState={this.getFirstNameValue}
                changeIsLoggedInState={this.changeIsLoggedInState}
                getScheduledMealsFromFirebase={
                  this.getScheduledMealsFromFirebase
                }
              />
            </Route>
            <Route exact path="/sign-up">
              <SignUp
                setEmailState={this.getEmailValue}
                setIdState={this.getUserIdFromSigning}
                setUserNameState={this.getFirstNameValue}
                changeIsLoggedInState={this.changeIsLoggedInState}
              />
            </Route>
            <Route exact path="/profile">
              <ProfilePage />
            </Route>
          </Switch>
          <React.Fragment>
            {this.state.user.isLoggedIn === false ? (
              <Redirect exact from="/" to="/landing-page" />
            ) : (
              <Redirect exact from="/" to="/dashboard" />
            )}
          </React.Fragment>
        </div>
      </Router>
    );
  }
}

export default App;
