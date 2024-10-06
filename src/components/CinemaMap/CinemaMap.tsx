import React, { useState, useEffect, useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { forwardGeocode } from "./GeocodeAddress";
import { baseUrl } from "../../config";

const CinemaMap: React.FC = () => {
  const [selectedArea, setSelectedArea] = useState<string>("All");
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  const fetchAndMapCinemas = useCallback(async () => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    try {
      const response = await axios.get(`${baseUrl}/cinemas`);
      const cinemas = response.data;
      for (const cinema of cinemas) {
        if (selectedArea === "All" || cinema.area === selectedArea) {
          try {
            const { latitude, longitude } = await forwardGeocode(
              cinema.address
            );
            const marker = new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .setPopup(
                new mapboxgl.Popup().setHTML(
                  `<h3><a href="/cinemas/${cinema._id}" style="color: purple; text-decoration: underline;">${cinema.name}</a></h3>`
                )
              )
              .addTo(map);
            markersRef.current.push(marker);
          } catch (error) {
            console.error(`Error geocoding address for ${cinema.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching cinemas:", error);
    }
  }, [map, selectedArea]);

  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_KINO_MAPBOX || "";

    const cinemaMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-0.1276, 51.5074],
      zoom: 10,
      scrollZoom: true,
      doubleClickZoom: false,
      boxZoom: false,
    });

    cinemaMap.on("load", () => {
      setMap(cinemaMap);
    });

    return () => {
      cinemaMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map) {
      fetchAndMapCinemas();
    }
  }, [map, selectedArea, fetchAndMapCinemas]);

  const handleAreaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedArea(event.target.value);
  };

  return (
    <div className="kino-gradient">
      <div className="map-flex">
        <div className="filter-container has-background-danger-dark mt-3">
          <div className="filter-label">
            <p className="subtitle has-text-white-ter">Filter by area -</p>
          </div>
          <div className="select is-rounded is-danger">
            <select
              value={selectedArea}
              onChange={handleAreaChange}
              className="area-filter"
            >
              <option value="All">All Areas</option>
              <option value="North">North</option>
              <option value="West">West</option>
              <option value="Central">Central</option>
              <option value="South">South</option>
              <option value="East">East</option>
            </select>
          </div>
        </div>
        <div className="map-container">
          <div id="map"></div>
        </div>
      </div>
    </div>
  );
};

export default CinemaMap;
