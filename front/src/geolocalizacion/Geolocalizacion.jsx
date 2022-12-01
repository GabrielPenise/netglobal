import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import Point from "./Point";
import { Axios } from "../utils/AxiosWithCredentials";

import "../assets/geolocalizacion/geolocalizacion.css";

function Geolocalizacion({ user }) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [guards, setGuards] = useState([]);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
    if (user) {
      Axios.get(`/guards/byClient/${user.id}`)
        .then((res) => res.data)
        .then((guards) => setGuards(guards))
        .catch((err) => console.error(err));
      Axios.get(`/branches/byClient/${user.id}`)
        .then((res) => res.data)
        .then((branches) => setBranches(branches))
        .catch((err) => console.error(err));
    }
  }, [user]);

  return (
    <div>
      {latitude && longitude ? (
        <MapContainer
          id="map"
          center={[latitude, longitude]}
          zoom={7}
          scrollWheelZoom={true}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Point coordinates={{ latitude, longitude }} />

          {guards
            ? guards.map((guard, i) => (
                <Point
                  key={i}
                  coordinates={{
                    latitude: guard.latitude,
                    longitude: guard.longitude,
                    type: "guard",
                  }}
                />
              ))
            : ""}
          {branches
            ? branches.map((branch, i) => (
                <Point
                  key={i}
                  coordinates={{
                    latitude: branch.latitude,
                    longitude: branch.longitude,
                    type: "branch",
                  }}
                />
              ))
            : ""}
        </MapContainer>
      ) : (
        ""
      )}
    </div>
  );
}

export default Geolocalizacion;
