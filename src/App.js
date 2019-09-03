import React from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";
import { DashBoard, ProfilePage, LandingPage } from "./scenes";

import styles from "./App.css";

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

const App = () => {
  return (
    <Router>
      <div className={appWrapper}>
        <Navigation />
        <Switch>
          <Route exact path="/landing-page">
            <LandingPage />
          </Route>
          <Route exact path="/dashboard">
            <DashBoard />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/sign-up">
            <SignUp />
          </Route>
          <Route exact path="/profile">
            <ProfilePage />
          </Route>
        </Switch>
        <React.Fragment>
          {this.state.user.isLoggedIn === false ? ( ///get context if logged in
            <Redirect exact from="/" to="/landing-page" />
          ) : (
            <Redirect exact from="/" to="/dashboard" />
          )}
        </React.Fragment>
      </div>
    </Router>
  );
};

export default App;
