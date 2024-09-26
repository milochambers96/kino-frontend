import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import { forwardGeocode } from "./GeocodeAddress";

const CinemaMap: React.FC = () => {
  useEffect(() => {
    mapboxgl.accessToken = import.meta.env.VITE_KINO_MAPBOX || "";

    const cinemaMap = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v12",
      center: [-0.1276, 51.5074],
      zoom: 10,
      scrollZoom: false, // Disable scroll zoom
      doubleClickZoom: false, // Disable double-click zoom
      boxZoom: false,
    });

    cinemaMap.on("load", () => {
      fetchAndMapCinemas();
    });

    const fetchAndMapCinemas = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/cinemas");
        const cinemas = response.data;

        for (const cinema of cinemas) {
          try {
            const { latitude, longitude } = await forwardGeocode(
              cinema.address
            );
            new mapboxgl.Marker()
              .setLngLat([longitude, latitude])
              .setPopup(new mapboxgl.Popup().setHTML(`<h3>${cinema.name}</h3>`))
              .addTo(cinemaMap);
          } catch (error) {
            console.error(error);
            throw new Error(`Error geocoding address for ${cinema.name}`);
          }
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.error("Error fetching cinemas:", error);
      }
    };

    return () => {
      cinemaMap.remove();
    };
  }, []);

  return (
    <div className="map-container">
      <div id="map"></div>
    </div>
  );
};

export default CinemaMap;
