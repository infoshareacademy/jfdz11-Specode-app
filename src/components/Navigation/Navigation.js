import React from "react";
import * as styles from "./Navigation.module.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeRounded from "@material-ui/icons/HomeRounded";
import { NavLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import avatarPlaceholder from "../../scenes/ProfilePage/avatar-placeholder.jpg";
import firebase from "firebase";
/*const Navigation = props => {

  const { navigation, userPhoto, navLink } = styles;
  return (
    <nav id={navigation}>
      {console.log("userAvatar", props.userAvatarUrl)}
      {console.log("isLoggedIn:", props.isLoggedIn)}
      <li>
        {
          <Avatar
            className={userPhoto}
            src={props.userAvatarUrl ? props.userAvatarUrl : avatarPlaceholder}
            style={{
              width: 40,
              height: 40
            }}
          />
        }
      </li>
      <li>{`Witaj ${
        props.isLoggedIn ? props.userFirstName : "użytkowniku!"
      }`}</li>
      {props.isLoggedIn ? (
        <li>
          <NavLink className={navLink} exact to="/dashboard">
            <HomeRounded />
          </NavLink>
        </li>
      ) : null}
      <li>
        {props.isLoggedIn ? (
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
        {props.isLoggedIn ? (
          <NavLink
            className={navLink}
            onClick={(props.changeIsLoggedInState, props.logOutChangeState)}
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
};*/
class Navigation extends React.Component {
  logIn() {
    this.props.changeIsLoggedInState(this.state);
  }
  logOut() {
    this.props.logOutChangeState(this.state);
  }
  mergeFunction() {
    this.logIn();
    this.logOut();
  }

  render() {
    const { navigation, userPhoto, navLink } = styles;
    return (
      <nav id={navigation}>
        {console.log("userAvatar", this.props.userAvatarUrl)}
        {console.log("isLoggedIn:", this.props.isLoggedIn)}
        {console.log("Name:", this.props.userFirstName)}
        <li>
          {this.props.isLoggedIn ? (
            <Avatar
              className={userPhoto}
              src={
                this.props.userAvatarUrl
                  ? this.props.userAvatarUrl
                  : avatarPlaceholder
              }
              style={{
                width: 40,
                height: 40
              }}
            />
          ) : (
            <Avatar
              style={{
                width: 0,
                height: 0
              }}
            />
          )}
        </li>
        <li>{`Witaj ${
          this.props.isLoggedIn ? this.props.userFirstName : "użytkowniku!"
        }`}</li>
        {this.props.isLoggedIn ? (
          <li>
            <NavLink className={navLink} exact to="/dashboard">
              <HomeRounded />
            </NavLink>
          </li>
        ) : null}
        <li>
          {this.props.isLoggedIn ? (
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
          {this.props.isLoggedIn ? (
            <NavLink
              className={navLink}
              onClick={this.mergeFunction.bind(this)}
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
  }
}

export default Navigation;
