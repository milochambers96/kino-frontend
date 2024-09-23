import { ICinema } from "../interfaces/cinema";
import { useEffect, useState } from "react";

export default function CinemaCard(cinema: ICinema) {
  const [cinemas, setCinemas] = useState(null);

  async function getCinemaData() {
    const resp = await fetch("http://localhost:8000/api/cinemas");
    const cinemaData = await resp.json();
    setCinemas(cinemaData);
  }

  useEffect(() => {
    getCinemaData();
  }, []);

  useEffect(() => {
    if (cinemas) {
      console.log(cinemas);
    }
  }, [cinemas]);
  return <h2>{cinema.name}</h2>;
}
