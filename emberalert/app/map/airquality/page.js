"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 34.0522,
  lng: -118.2437,
};

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const libraries = ["visualization"];

export default function AirQualityMap() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries,
  });

  const mapRef = useRef(null);
  const [aqi, setAqi] = useState(null);
  const [heatmapOn, setHeatmapOn] = useState(true);

  const fetchAQIData = async () => {
    try {
      const response = await fetch(
        `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            location: {
              latitude: center.lat,
              longitude: center.lng,
            },
          }),
        }
      );
  
      const data = await response.json();
      const index = data?.indexes?.[0]; // ✅ FIXED
      if (index?.aqi) {
        setAqi(index);
      } else {
        console.warn("No AQI data for this location.");
        setAqi(null);
      }
    } catch (err) {
      console.error("Failed to fetch AQI:", err);
    }
  };
  

  useEffect(() => {
    if (isLoaded) {
      fetchAQIData();
    }
  }, [isLoaded]);

  const onLoad = (map) => {
    mapRef.current = map;

    const aqiOverlay = new window.google.maps.ImageMapType({
      getTileUrl: function (coord, zoom) {
        return `https://airquality.googleapis.com/v1/mapTypes/UAQI_RED_GREEN/heatmapTiles/${zoom}/${coord.x}/${coord.y}?key=${apiKey}`;
      },
      tileSize: new window.google.maps.Size(256, 256),
      name: "Air Quality",
      maxZoom: 10,
      minZoom: 4,
      opacity: heatmapOn ? 0.6 : 0,
    });

    map.overlayMapTypes.insertAt(0, aqiOverlay);
  };

  const rgbColor = aqi
    ? `rgb(${aqi.color.red * 255}, ${aqi.color.green * 255}, ${
        aqi.color.blue * 255
      })`
    : "#ccc";

  return isLoaded ? (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={4}
        onLoad={onLoad}
      />

      {/* AQI UI Box */}
      <div
        style={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          zIndex: 1000,
          width: "280px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", borderBottom: "1px solid #eee" }}>
          <div style={{ flex: 1, fontWeight: 600, padding: "0.5rem" }}>
            Universal AQI
          </div>
          <div
            style={{
              flex: 1,
              fontWeight: 500,
              padding: "0.5rem",
              color: "#999",
            }}
          >
            AQI (US)
          </div>
        </div>

        <div
          style={{
            marginTop: "1rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: "80px",
              height: "80px",
              borderRadius: "50%",
              backgroundColor: "#f4f4f4",
              border: `6px solid ${rgbColor}`,
              margin: "0 auto",
              lineHeight: "68px",
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {aqi ? aqi.aqiDisplay : "--"}
          </div>

          <p style={{ fontWeight: 600, marginTop: "0.5rem" }}>
            {aqi ? aqi.category : "Loading..."}
          </p>

          <p style={{ fontSize: "0.9rem", color: "#666" }}>
            Dominant pollutant:{" "}
            <span style={{ fontWeight: 500 }}>{aqi?.dominantPollutant || "--"}</span>
          </p>
        </div>

        <hr style={{ margin: "1rem 0" }} />

        <div style={{ fontSize: "0.85rem", fontWeight: 500 }}>
          Heatmap
          <label style={{ float: "right" }}>
            <input
              type="checkbox"
              checked={heatmapOn}
              onChange={() => setHeatmapOn(!heatmapOn)}
            />
          </label>
        </div>
        <div
          style={{
            marginTop: "0.5rem",
            height: "10px",
            background:
              "linear-gradient(to right, #d73027, #ffffbf, #1a9850)",
            borderRadius: "5px",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: "0.7rem",
            marginTop: "0.25rem",
            color: "#555",
          }}
        >
          <span>Poor</span>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading Air Quality Map...</div>
  );
}
