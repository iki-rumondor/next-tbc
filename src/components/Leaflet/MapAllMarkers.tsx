import React from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { HealthCenter } from "@/types/health_center";

interface Props {
  healthCenters: HealthCenter[];
  handleClick: (uuid: string) => void;
}

export default function MapAllMarkers({ props }: { props: Props }) {
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

  return (
    <div className="relative">
      <MapContainer
        className="min-h-screen"
        center={[0.5514057167467522, 123.05040882691613]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ zIndex: 1 }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {props.healthCenters &&
          props.healthCenters.map((item, idx) => (
            <button key={idx}>
              <Marker
                position={[item.latitude, item.longitude]}
                icon={markerIcon}
              >
                <Popup>
                  <button onClick={() => props.handleClick(item.uuid)}>
                    Lihat Detail
                  </button>
                </Popup>
                <Tooltip>Puskesmas {item.name}</Tooltip>
              </Marker>
            </button>
          ))}
      </MapContainer>
    </div>
  );
}
