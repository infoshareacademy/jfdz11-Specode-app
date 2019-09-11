import React from "react";
import { withRouter } from "react-router-dom";
import * as styles from "./LandingPage.module.css";

const LandingPage = props => {
  const { landingPageWrapper, header } = styles;

  return (
    <div className={landingPageWrapper}>
      <h1 className={header}>Przejmij kontrolę nad swoim ciałem, śledź kalorię i dobieraj posiłki razem z nami! Bądź zmotywowany!</h1>
    </div>
  );
};

export default withRouter(LandingPage);
