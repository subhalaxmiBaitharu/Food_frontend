import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import style from './indiaMap.module.css'


const IndiaMap = () => {
  const sambalpurCoordinates = [21.4511, 83.9956];

  const mapStyle = {
    height: "28rem",
    width: "100%",
  };

  const mapIcon = new L.Icon({
    className: "map",
    html: `<div class="iconMap">1</div>`,
    iconUrl: require('../images/Previous Location.png'),
    iconSize: [35, 35],
    iconAnchor: [12, 41],
  });

  return (
    <div className={style.map} style={mapStyle}>
      <div className={style.information}>
        <h3>McDonald's</h3>
        <h3><span>Sambalpur</span></h3>
        <p className={style.details}>Sector 12, Near Kaveri Hospital</p>
        <h4>Phone number</h4>
        <p className={style.number}><span>+91 9473909716</span></p>
        <h4>Website</h4>
        <p><span>http://mcdonalds.in/</span></p>
      </div>
      <MapContainer
        center={sambalpurCoordinates} 
        zoom={18} 
        style={{ height: "100%", width: "100%", zIndex: "5" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />
        <Marker position={sambalpurCoordinates} icon={mapIcon} >
          <Popup>
            <strong>McDonald's</strong> <br />
            Sambalpur
          </Popup>
        </Marker>
      </MapContainer>
      <style>{`
        .iconMap {
          width: 30px;
          height: 30px;
          background-color: black;
          border-radius: 50%; /* Make it circular */
          display: flex;
          justify-content: center;
          align-items: center;
          color: white;
          font-size: 16px; /* Optional: Add a number or symbol if needed */
        }
      `}</style>
    </div>
  );
};

export default IndiaMap;
