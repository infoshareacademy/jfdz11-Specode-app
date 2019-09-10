import React, { useContext, useEffect } from "react";
import * as styles from "./Navigation.module.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
import HomeRounded from "@material-ui/icons/HomeRounded";
import { NavLink } from "react-router-dom";
<<<<<<< HEAD
import Avatar from "@material-ui/core/Avatar";
import avatarPlaceholder from "../../scenes/ProfilePage/avatar-placeholder.jpg";

=======
import { UserContext } from "../../contexts/userContext";
>>>>>>> MarcinJarowskiFirebase
const Navigation = props => {
  const {
    changeIsLoggedIn,
    user: { isLoggedIn, userFirstName }
  } = useContext(UserContext);

  // useEffect(() => {
  //   a, [];
  // });
  // console.log(userFirstName); //// coś nie działa

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
