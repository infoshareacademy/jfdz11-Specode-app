import React, { useContext } from "react";
import * as styles from "./Navigation.module.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeRounded from "@material-ui/icons/HomeRounded";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
const Navigation = props => {
  const {
    changeIsLoggedIn,
    user: { isLoggedIn, userFirstName }
  } = useContext(UserContext);
  console.log(userFirstName); //// coś nie działa
  const { navigation, userPhoto, navLink } = styles;
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
      <li>{`Witaj ${isLoggedIn ? userFirstName : "użytkowniku!"}`}</li>
      {isLoggedIn ? (
        <li>
          <NavLink className={navLink} exact to="/dashboard">
            <HomeRounded />
          </NavLink>
        </li>
      ) : null}
      <li>
        {isLoggedIn ? (
          <NavLink className={navLink} exact to="/profile">
            Profil
          </NavLink>
        ) : (
          <NavLink className={navLink} exact to="/sign-up">
            Zarejestruj się
          </NavLink>
        )}
      </li>
      <li>
        {isLoggedIn ? (
          <NavLink
            className={navLink}
            onClick={changeIsLoggedIn}
            exact
            to="/login"
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
