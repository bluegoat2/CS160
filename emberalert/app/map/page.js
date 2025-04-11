"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
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
    libraries: ["visualization"], // Required for heatmaps
  });

  const mapRef = useRef(null);
  const [heatmap, setHeatmap] = useState(null);

  const onLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(() => {
    mapRef.current = null;
  }, []);

  useEffect(() => {
    const loadHeatmap = async () => {
      try {
        const res = await fetch("/api/wildfires"); // Uses route.js proxy
        const data = await res.json();

        const heatmapData = data.map((point) => {
          return {
            location: new window.google.maps.LatLng(point.latitude, point.longitude),
            weight: point.bright_ti4,
          };
        });

        const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          radius: 20,
        });

        heatmapLayer.setMap(mapRef.current);
        setHeatmap(heatmapLayer);
      } catch (err) {
        console.error("Error loading heatmap data:", err);
      }
    };

    if (isLoaded && mapRef.current) {
      loadHeatmap();
    }
  }, [isLoaded]);

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

