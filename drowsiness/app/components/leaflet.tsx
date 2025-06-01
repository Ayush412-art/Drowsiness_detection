"use client";
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
import { getSocket } from "../utils/socket";

// Icon for all markers
const icon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Recenter map to current user location
function RecenterMap({ latlng }: { latlng: L.LatLngExpression }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(latlng, map.getZoom());
  }, [latlng, map]);
  return null;
}

export default function LeafletMap() {
  const [myLocation, setMyLocation] = useState<[number, number] | null>(null);
  const [allLocations, setAllLocations] = useState<{
    [id: string]: { lat: number; lng: number };
  }>({});
  const markerRef = useRef<LeafletMarker | null>(null);
  const socketRef = useRef(getSocket());

  useEffect(() => {
    const socket = socketRef.current;

    // Listen for all users' locations
    socket.on("allLocations", (locations) => {
      setAllLocations(locations);
    });

    // Clean up on unmount
    return () => {
      socket.off("allLocations");
    };
  }, []);

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

        // Emit to server
        socketRef.current.emit("userLocation", {
          lat: coords[0],
          lng: coords[1],
        });

        // Update marker position manually if needed
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

        {/* Your marker */}
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

        {/* Other users */}
        {Object.entries(allLocations).map(([id, loc]) => {
          // Skip own location
          if (myLocation && loc.lat === myLocation[0] && loc.lng === myLocation[1]) {
            return null;
          }
          return (
            <Marker key={id} position={[loc.lat, loc.lng]} icon={icon}>
              <Popup>User: {id}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
