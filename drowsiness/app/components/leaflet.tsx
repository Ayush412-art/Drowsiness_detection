import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L, { Marker as LeafletMarker } from "leaflet";
import "leaflet/dist/leaflet.css";


const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function RecenterMap({ latlng }: { latlng: L.LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(latlng, map.getZoom());
  }, [latlng, map]);
  return null;
}

export default function LeafletMap() {
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null);
  const markerRef = useRef<LeafletMarker | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const coords: [number, number] = [
          pos.coords.latitude,
          pos.coords.longitude,
        ];
        setMyLocation(coords);

        
        if (markerRef.current) {
          markerRef.current.setLatLng(coords);
        }
      },
      (err) => console.error("Geolocation error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: Infinity,
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={myLocation || [0, 0]}
        zoom={18}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {myLocation && (
          <>
            <Marker
              position={myLocation}
              icon={icon}
              ref={(ref) => {
                if (ref) markerRef.current = ref;
              }}
            >
              <Popup>You are here</Popup>
            </Marker>
            <RecenterMap latlng={myLocation} />
          </>
        )}
      </MapContainer>
    </div>
  );
}
