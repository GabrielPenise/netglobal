import React, { Component, useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import "../assets/geolocalizacion/geolocalizacion.css";


function Geolocalizacion() {
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitud(position.coords.latitude);
      setLongitud(position.coords.longitude);
      console.log(longitud)
      console.log(latitud)
      
    });
  }, []);
  

  return (
    <div >
      <MapContainer
     id="map"
        center={[latitud, longitud]}
        zoom={2}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={[latitud, longitud]}></Marker>
      </MapContainer>
      </div>
   
  );
}

export default Geolocalizacion;