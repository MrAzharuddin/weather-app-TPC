"use client";
import { Constants } from "@/configs";
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
function Map() {
  // states
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  mapboxgl.accessToken = Constants.GOOGLE_MAPS_API_KEY;
  const mapContainer = useRef(null);
  const map = useRef(null);

  // fetch user coordinates
  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation is not supported by your browser");
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        setLat(latitude);
        setLng(longitude);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      initialViewState: { latitude: lng, longitude: lat, zoom: 10 },
      center: [lng, lat],
      zoom: zoom,
    });

    map.current = new mapboxgl.Marker()
      .setLngLat([lng, lat])
      .addTo(map.current);

    map.current.on("move", () => {
      setZoom(map.current.getZoom().toFixed(2));
      setLat(map.current.getCenter().lat.toFixed(4));
      setLng(map.current.getCenter().lng.toFixed(4));
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} className="map-container w-[90vw] mx-auto shadow-xl mt-8 border rounded-xl space-y-5" />
    </div>
  );
}

export default Map;
