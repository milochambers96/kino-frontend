import { useState, useEffect } from "react";
import { ICinema } from "../../interfaces/cinema";
import FullPageLoader from "../Forms & Utility Components/FullPageLoader";
import CinemaCard from "./CinemaCard";
import { baseUrl } from "../../config";

type Cinemas = null | Array<ICinema>;

function CinemaList() {
  const [cinemas, setCinemas] = useState<Cinemas>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  async function getCinemaData() {
    const resp = await fetch(`${baseUrl}/cinemas`);
    const cinemaData = await resp.json();
    setCinemas(cinemaData);
    setIsLoading(false);
  }

  useEffect(() => {
    getCinemaData();
  }, []);

  const filteredCinemas = cinemas?.filter((cinema) =>
    cinema.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="section kino-gradient">
      {isLoading ? (
        <FullPageLoader />
      ) : (
        <div className="container mt-5 kino-scroll">
          <div className="columns is-centered">
            <div className="column is-one-third">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search by cinema name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="columns is-multiline">
            {filteredCinemas?.map((cinema) => (
              <CinemaCard {...cinema} key={cinema._id} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default CinemaList;
