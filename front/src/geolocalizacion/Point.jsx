import React from "react";
import { Marker } from "react-leaflet";
import { divIcon } from "leaflet";
import ReactDOMServer from "react-dom/server";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield, faBuilding } from "@fortawesome/free-solid-svg-icons";

const Point = ({ coordinates }) => {
  const { latitude, longitude, type } = coordinates;
  let iconMarkup = {};
  if (type) {
    iconMarkup =
      type === "branch"
        ? ReactDOMServer.renderToString(
            <FontAwesomeIcon icon={faBuilding} size="2x" pull="Branch" />
          )
        : ReactDOMServer.renderToString(
            <FontAwesomeIcon icon={faUserShield} size="2x" />
          );
  }
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  return type ? (
    <Marker position={[latitude, longitude]} icon={customMarkerIcon}></Marker>
  ) : (
    <Marker position={[latitude, longitude]}></Marker>
  );
};

export default Point;
