import React from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface Props {
  position: { lat: number; lng: number } | null;
  setPosition: ({ lat, lng }: { lat: number; lng: number }) => void;
}

export default function MapWithClickMark({ props }: { props: Props }) {
  const markerIcon = new L.Icon({
    iconUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    shadowSize: [41, 41],
  });

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        props.setPosition({ lat, lng });
      },
    });
    return null;
  };
  return (
    <div className="relative">
      <MapContainer
        className="h-80"
        center={[0.5514057167467522, 123.05040882691613]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ zIndex: 1 }}
      >
        <MapClickHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.position && (
          <Marker
            position={[props.position.lat, props.position.lng]}
            icon={markerIcon}
          />
        )}
      </MapContainer>
    </div>
  );
}
