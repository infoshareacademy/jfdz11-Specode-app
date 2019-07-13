import React from "react";
import {
  footerStyle,
  teamContainer,
  imagesOfUs,
  imageOfUsContainer,
  imagePersonContainer
} from "./Footer.module.css";
import paulina from "./paulina.jpg";
import marcin from "./marcin.jpg";
import jaros from "./jaros.jpg";

function FooterCopyright() {
  return <p className={footerStyle}>Copyright by Specode team</p>;
}

function Team() {
  return (
    <div className={teamContainer}>
      <p>Skład zespołu:</p>
      <div className={imageOfUsContainer}>
        <div className={imagePersonContainer}>
          <p>Paulina Aniśkiewicz</p>
          <a
            href="https://www.linkedin.com/in/paulina-ani%C5%9Bkiewicz-4b7247179/"
            target="_blank"
            rel="noopener nofererrer"
          >
            <img
              src={paulina}
              className={imagesOfUs}
              alt="Paulina Aniśkiewicz"
            />
          </a>
        </div>
        <div className={imagePersonContainer}>
          <p>Marcin Galera</p>
          <a
            href="https://www.linkedin.com/in/marcin-galera/"
            target="_blank"
            rel="noopener nofererrer"
          >
            <img src={marcin} className={imagesOfUs} alt="Marcin Galera" />
          </a>
        </div>
        <div className={imagePersonContainer}>
          <p>Marcin Jarowski</p>
          <a
            href="https://www.linkedin.com/in/marcin-jarowski/"
            target="_blank"
            rel="noopener nofererrer"
          >
            <img src={jaros} className={imagesOfUs} alt="Marcin Jarowski" />
          </a>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <FooterCopyright />
      <Team />
    </footer>
  );
}

export default Footer;
