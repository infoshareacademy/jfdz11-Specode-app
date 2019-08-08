import React, { useState } from "react";
import * as styles from "./Navigation.module.css";
import AccountCircle from "@material-ui/icons/AccountCircle";
const Navigation = props => {
  console.log(props);
  const { navigation, userPhoto, buttonLogin, buttonRegister } = styles;
  return (
    <nav id={navigation}>
      <li>
        {
          <div
            className={userPhoto}
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "red"
            }}
          >
            <span style={{ margin: "auto" }}>
              <AccountCircle fontSize="large" />
            </span>
          </div>
        }
      </li>
      <li>Witaj użytkowniku!</li>
      <li className={buttonLogin}>
        <button>Zaloguj</button>
      </li>
      <li className={buttonRegister}>
        <button>Zarejestruj się</button>
      </li>
    </nav>
  );
};

export default Navigation;
