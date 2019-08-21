import React from "react";
import { withRouter } from "react-router-dom";
import * as styles from "./LandingPage.module.css";

const LandingPage = props => {
  const { landingPageWrapper, header } = styles;

  return (
    <div className={landingPageWrapper}>
      <h1 className={header}>OHHHH DAWAJ REJESTRUJ SIĘ I OBCZAJ TĘ SZAMKĘ</h1>
    </div>
  );
};

export default withRouter(LandingPage);
