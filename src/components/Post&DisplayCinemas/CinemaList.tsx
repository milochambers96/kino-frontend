import { useState, useEffect } from "react";
import { ICinema } from "../../interfaces/cinema";
import FullPageLoader from "../Forms & Utility Components/FullPageLoader";
import CinemaCard from "./CinemaCard";

type Cinemas = null | Array<ICinema>;

function CinemaList() {
  const [cinemas, setCinemas] = useState<Cinemas>(null);
  const [isLoading, setIsLoading] = useState(true);

  async function getCinemaData() {
    const resp = await fetch("http://localhost:8000/api/cinemas");
    const cinemaData = await resp.json();
    setCinemas(cinemaData);
    setIsLoading(false);
  }

  useEffect(() => {
    getCinemaData();
  }, []);

  return (
    <section className="section">
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className="container mt-5">
          <div className="columns is-multiline">
            {cinemas?.map((cinema) => (
              <CinemaCard {...cinema} key={cinema._id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default CinemaList;
