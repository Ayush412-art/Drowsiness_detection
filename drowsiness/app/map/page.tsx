"use client";

import dynamic from "next/dynamic";

const LeafletMap = dynamic(() => import("../components/leaflet"), {
  ssr: false,
});

export default function MapPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Drowsiness Detection System</h1>
      <LeafletMap />
    </main>
  );
}
