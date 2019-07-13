import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import {
  footerContainer,
  footerStyle,
  teamContainer,
  imagesOfUs,
  imageOfUsContainer,
  imagePersonContainer,
  secondFooterContainer,
  mapContainer,
  adress,
  mapWithAdressContainer
} from "./Footer.module.css";
import paulina from "./paulina.jpg";
import marcin from "./marcin.jpg";
import jaros from "./jaros.jpg";

function FooterCopyright() {
  return <p>Copyright by Specode team</p>;
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

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 54.403139,
      lng: 18.5695
    },
    zoom: 11
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className={mapContainer} styles={{ height: "50%" }}>
        <GoogleMapReact
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
        </GoogleMapReact>
      </div>
    );
  }
}

function Adress() {
  return (
    <div className={adress} style={{ color: "lightgrey" }}>
      <h4>Adres siedziby:</h4>
      <p>Olivia Four </p>
      <p>aleja Grunwaldzka 472b</p> <p>80-309 Gdańsk</p>
    </div>
  );
}

function Footer() {
  return (
    <footer className={footerContainer}>
      <div className={secondFooterContainer}>
        <Team />
        <div className={mapWithAdressContainer}>
          <Adress />
          <SimpleMap />
        </div>
      </div>
      <div className={footerStyle}>
        <FooterCopyright />
      </div>
    </footer>
  );
}

export default Footer;
