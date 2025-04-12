"use client";
import React, { useCallback, useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 37.7749, // Example center (California)
  lng: -122.4194,
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["visualization"],
  });

  const mapRef = useRef(null);
  const [heatmap, setHeatmap] = useState(null);

  const loadHeatmap = async (mapInstance) => {
    try {
      const res = await fetch("/api/wildfires");
      const data = await res.json();

      const heatmapData = data.map((point) => ({
        location: new window.google.maps.LatLng(point.latitude, point.longitude),
        weight: point.bright_ti4,
      }));

      console.log("🔥 Heatmap data preview:", heatmapData);

      const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        radius: 20,
      });

      heatmapLayer.setMap(mapInstance);
      setHeatmap(heatmapLayer);
    } catch (err) {
      console.error("Error loading heatmap data:", err);
    }
  };

  const onLoad = useCallback((map) => {
    mapRef.current = map;
    loadHeatmap(map); // 🔥 Load heatmap immediately after map loads
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
  ) : (
    <div>Loading Map...</div>
  );
}

export default React.memo(MyComponent);
