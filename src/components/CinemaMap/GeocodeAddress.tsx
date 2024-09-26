import axios from "axios";

const mapboxToken = import.meta.env.VITE_KINO_MAPBOX || "";

export const forwardGeocode = async (address: string) => {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
      )}.json`,
      {
        params: {
          access_token: mapboxToken,
        },
      }
    );

    if (response.data.features && response.data.features.length > 0) {
      const { geometry } = response.data.features[0];
      return {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      };
    } else {
      throw new Error("No coordinates found for this address");
    }
  } catch (error) {
    console.error("Geocoding error:", error);
    throw error;
  }
};
