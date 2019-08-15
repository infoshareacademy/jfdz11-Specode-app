import React from "react";
import { withRouter } from "react-router-dom";
import * as styles from "./ProfilePage.module.css";

const ProfilePage = props => {
  const { profilePageWrapper, profilePic } = styles;

  return (
    <div className={profilePageWrapper}>
      <div className={profilePic}>profilePic</div>
      <button>zmień zdj prof</button>
      <div>mail</div>
      <div>kiedy konto zal</div>
      <div>usun konto?</div>
      <div>zmien haslo</div>
    </div>
  );
};

export default withRouter(ProfilePage);
