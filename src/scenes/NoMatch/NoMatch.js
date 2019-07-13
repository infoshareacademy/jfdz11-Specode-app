import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Title } from "../../components";
import { container, bigTitle, link } from "./NoMatch.module.css";

function NoMatch(props) {
  return (
    <Fragment>
      <Title>Planer żywieniowy</Title>
      <div className={container}>
        <h1 className={bigTitle}>404</h1>
        <Link className={link} to="/big-calendar">
          Go back home
        </Link>
      </div>
    </Fragment>
  );
}

export default NoMatch;
