"use client";
import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = { width: "100vw", height: "100vh" };
const center = { lat: 37.7749, lng: -122.4194 }; // Centered over California

export default function AirQualityMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyBoknMY4zq7KkklMACakmp4CvZYSj_jaSE", //  Replace later with .env
    libraries: ["visualization"], 
  });

  const mapRef = useRef(null);

  const onLoad = (map) => {
    mapRef.current = map;

    
    const aqiOverlay = new window.google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        return `https://airquality.googleapis.com/v1/mapTypes/UAQI_RED_GREEN/heatmapTiles/${zoom}/${coord.x}/${coord.y}?key=AIzaSyBoknMY4zq7KkklMACakmp4CvZYSj_jaSE`;
      },
      tileSize: new window.google.maps.Size(256, 256),
      name: "Air Quality",
      maxZoom: 10,
      minZoom: 4,
      opacity: 0.6, 
    });

    map.overlayMapTypes.insertAt(0, aqiOverlay);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6} 
      onLoad={onLoad}
    />
  ) : (
    <div>Loading Air Quality Map...</div>
  );
}
