import React, { useState } from "react";
import * as styles from "./Navigation.module.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { NavLink } from "react-router-dom";
const Navigation = props => {
  console.log(props);
  const {
    navigation,
    userPhoto,
    buttonLogin,
    buttonRegister,
    navLink
  } = styles;
  return (
    <nav id={navigation}>
      <li>
        {
          <div
            className={userPhoto}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "inherit"
            }}
          >
            <span style={{ margin: "auto" }}>
              <AccountCircle fontSize="large" />
            </span>
          </div>
        }
      </li>
      <li>{`Witaj ${
        props.isLoggedIn ? props.userFirstName : "użytkowniku!"
      }`}</li>
      <li>
        {props.isLoggedIn ? (
          <NavLink className={navLink} exact to="/dashboard">
            Profil
          </NavLink>
        ) : (
          <NavLink className={navLink} exact to="/sign-up">
            Zarejestruj się
          </NavLink>
        )}
      </li>
      <li>
        {props.isLoggedIn ? (
          <NavLink
            className={navLink}
            exact
            to="/login"
            onClick={props.changeIsLoggedInState}
          >
            Wyloguj
          </NavLink>
        ) : (
          <NavLink className={navLink} exact to="/login">
            Zaloguj się
          </NavLink>
        )}
      </li>
    </nav>
  );
};

export default Navigation;
