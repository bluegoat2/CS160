"use client";
import React, { useRef, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100vw", height: "100vh" };
const center = { lat: 37.7749, lng: -122.4194 };

export default function WildfireMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script", 
    googleMapsApiKey: "AIzaSyBoknMY4zq7KkklMACakmp4CvZYSj_jaSE",
    libraries: ["visualization"], 
  });
  
  const mapRef = useRef(null);
  const [heatmap, setHeatmap] = useState(null);

  const loadHeatmap = async (mapInstance) => {
    const res = await fetch("/api/wildfires");
    const data = await res.json();

    const heatmapData = data.map((point) => ({
      location: new window.google.maps.LatLng(point.latitude, point.longitude),
      weight: point.bright_ti4,
    }));

    const heatmapLayer = new window.google.maps.visualization.HeatmapLayer({
      data: heatmapData,
      radius: 20,
    });

    heatmapLayer.setMap(mapInstance);
    setHeatmap(heatmapLayer);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={4}
      onLoad={loadHeatmap}
    />
  ) : (
    <div>Loading Wildfire Map...</div>
  );
}
