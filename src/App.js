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
import { CreateNewFolderOutlined } from "@material-ui/icons";

const { appWrapper } = styles;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todayFullDate: moment(),
      newMealId: "",
      userCustomMealsArray: [],
      concatedMealsForSelect: [],
      user: {
        userEmailValue: "",
        isLoggedIn: false,
        userFirstName: "",
        userPicture: null,
        userCustomMealsArray: [],
        userScheduledMealsArray: [],
        userId: "",
        userAvatarUrl: ""
      }
    };
  }

  logOutChangeState = () => {
    this.setState({
      todayFullDate: moment(),
      newMealId: "",
      commonMeals: [],
      scheduledMealsArray: [],
      user: {
        userEmailValue: "",
        isLoggedIn: false,
        userFirstName: "",
        userPicture: null,
        userCustomMealsArray: [],
        userScheduledMealsArray: [],
        userId: ""
      }
    });
  };
  getEmailValue = email => {
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

  addMealToSchedule = mealObjectToSchedule => {
    this.setState(
      {
        user: {
          ...this.state.user,
          userScheduledMealsArray: [
            ...this.state.user.userScheduledMealsArray,
            {
              ...mealObjectToSchedule,
              date: mealObjectToSchedule.date.toDate().toISOString()
            }
          ]
        }
      },
      () => {
        firebase
          .database()
          .ref("scheduledMeals/" + this.state.user.userId)
          .set({
            ...this.state.user.userScheduledMealsArray
          });
      }
    );
  };

  getScheduledMealsFromFirebase = userUid => {
    firebase
      .database()
      .ref("scheduledMeals/" + userUid)
      .on("value", snapshot => {
        const scheduledMealsList = snapshot.val() || [];
        let scheduledUserMealsFirebase = Object.entries(scheduledMealsList).map(
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
              userScheduledMealsArray: scheduledUserMealsFirebase
            }
          },
          () => {
            console.log(this.state.user.userScheduledMealsArray);
            console.log(`to planowane ^^`);
            this.getCommonMealsAndConcatWithUserCustomOnes();
          }
        );
      });
  };

  getUserCustomMealsFromFirebase = userUid => {
    firebase
      .database()
      .ref("customMeals/" + userUid)
      .on("value", snapshot => {
        const mealsListObject = snapshot.val() || [];
        let customMealsFirebase = Object.values(mealsListObject).map(entry => {
          return { ...entry };
        });
        this.setState({
          user: {
            ...this.state.user,
            userCustomMealsArray: customMealsFirebase
          }
        });
      });
  };

  addToUserCustomMealsArray = mealObject => {
    let { calories, id, name, type } = mealObject;
    let firebaseMeal = { calories, id, name, type };
    let customUserMeals = [
      ...this.state.user.userCustomMealsArray,
      firebaseMeal
    ];
    console.log(customUserMeals);

    this.setState(
      {
        user: { ...this.state.user, userCustomMealsArray: customUserMeals }
      },
      () => {
        this.getCommonMealsAndConcatWithUserCustomOnes();
        firebase
          .database()
          .ref("customMeals/" + this.state.user.userId)
          .set(customUserMeals);
      }
    );
  };

  getCommonMealsAndConcatWithUserCustomOnes = () => {
    firebase
      .database()
      .ref("mealsArray")
      .on("value", snapshot => {
        let commonMeals = snapshot.val();
        let commonMealsArr = Object.values(commonMeals).map(e => {
          return { ...e };
        });

        this.setState({
          concatedMealsForSelect: [
            ...this.state.user.userCustomMealsArray,
            ...commonMealsArr
          ]
        });
      });
  };
  updateMealId = () => {
    this.setState({ newMealId: this.state.newMealId + 1 });
  };

  handleAvatarChange = () => {
    firebase
      .storage()
      .ref("avatars/" + this.state.user.uid)
      .getDownloadURL()
      .then(url =>
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            userAvatarUrl: url
          }
        })
      )
      .catch(() =>
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            userAvatarUrl: null
          }
        })
      );
  };

  handleRemoveAvatar = () => {
    firebase
      .storage()
      .ref("avatars/" + this.state.user.uid)
      .delete()
      .then(() => {
        this.handleAvatarChange();
      });
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .storage()
          .ref("avatars/" + this.state.user.uid)
          .getDownloadURL()
          .then(url =>
            this.setState({
              ...this.state,
              user: {
                ...this.state.user,
                userAvatarUrl: url
              }
            })
          )
          .catch(() =>
            this.setState({
              ...this.state,
              user: {
                ...this.state.user,
                userAvatarUrl: null
              }
            })
          );
      } else {
        this.setState({
          ...this.state,
          user: {
            ...this.state.user,
            userAvatarUrl: null
          }
        });
      }
    });
  }

  render() {
    return (
      <Router>
        {this.state.user.isLoggedIn}
        <div className={appWrapper}>
          <Navigation
            logOutChangeState={this.logOutChangeState.bind(this)}
            isLoggedIn={this.state.user.isLoggedIn}
            userFirstName={this.state.user.userFirstName}
            userPicture={this.state.user.userPicture}
            changeIsLoggedInState={this.changeIsLoggedInState.bind(this)}
            getAvatarUrl={this.getAvatarUrl}
            userAvatarUrl={this.state.user.userAvatarUrl}
          />
          <Switch>
            <Route exact path="/landing-page">
              <LandingPage />
            </Route>
            <Route exact path="/dashboard">
              <DashBoard
                mealsArray={this.state.concatedMealsForSelect}
                scheduledMealsArray={this.state.user.userScheduledMealsArray}
                updateMealId={this.updateMealId}
                newMealId={this.state.newMealId}
                addMealToSchedule={this.addMealToSchedule}
                addToMealsArray={this.addToUserCustomMealsArray}
                setDate={this.setDate}
                dateProps={this.state.todayFullDate}
                getAvatarUrl={this.state.getAvatarUrl}
                userAvatarUrl={this.state.user.userAvatarUrl}
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
                getMealsArrayFromFireBase={this.getUserCustomMealsFromFirebase}
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
              <ProfilePage
                changeIsLoggedInState={this.changeIsLoggedInState.bind(this)}
                logOutChangeState={this.logOutChangeState.bind(this)}
                userAvatarUrl={this.state.user.userAvatarUrl}
                userPicture={this.state.user.userPicture}
                onAvatarChange={this.handleAvatarChange.bind(this)}
                onAvatarRemove={this.handleRemoveAvatar.bind(this)}
                userEmailValue={this.state.user.userEmailValue}
              />
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
