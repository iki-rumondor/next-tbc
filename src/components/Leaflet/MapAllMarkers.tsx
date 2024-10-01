import React from "react";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { Result } from "@/types/result";

interface Props {
  results: Result[];
  handleClick: (uuid: string) => void;
}

export default function MapAllMarkers({ props }: { props: Props }) {
  const getIcon = (cluster: number) => {
    const iconNames = ["blue-mark.png", "yellow-mark.png", "red-mark.png"];
    const markerIcon = new L.Icon({
      iconUrl: `/icons/${iconNames[cluster]}`,
      iconSize: [28, 42],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
      shadowSize: [41, 41],
    });
    return markerIcon;
  };

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
        {props.results &&
          props.results?.map((item, idx) => (
            <button key={idx}>
              <Marker
                position={[
                  item.case.health_center.latitude,
                  item.case.health_center.longitude,
                ]}
                icon={getIcon(item.cluster)}
              >
                <Popup>
                  <button onClick={() => props.handleClick(item.uuid)}>
                    Lihat Detail
                  </button>
                </Popup>
                <Tooltip>Puskesmas {item.case.health_center.name}</Tooltip>
              </Marker>
            </button>
          ))}
      </MapContainer>
    </div>
  );
}
