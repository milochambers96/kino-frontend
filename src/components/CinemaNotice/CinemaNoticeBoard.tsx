import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { IUser } from "../../interfaces/user";
import { ICinema } from "../../interfaces/cinema";
import { IEvent } from "../../interfaces/event";
import CinemaDetails from "./CinemaDetails";
import EventsThread from "./EventsThread";
import FullPageLoader from "../Forms & Utility Components/FullPageLoader";
import { baseUrl } from "../../config";

function CinemaNoticeBoard({ user }: { user: null | IUser }) {
  const [cinema, setCinema] = useState<ICinema | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { cinemaId } = useParams();

  useEffect(() => {
    async function fetchCinema() {
      const resp = await fetch(`${baseUrl}/cinemas/${cinemaId}`);
      const cinemaData = await resp.json();
      setCinema(cinemaData);
    }
    async function fetchEvents() {
      const resp = await fetch(`${baseUrl}/cinemas/${cinemaId}/events`);
      const { cinemaEvents } = await resp.json();
      setEvents(cinemaEvents);
      setIsLoading(false);
    }
    fetchCinema();
    fetchEvents();
  }, [cinemaId]);

  return (
    <div className="kino-background">
      <section className="section">
        <div className="container mt-5">
          <div className="columns is-multiline is-centered">
            {isLoading ? (
              <FullPageLoader />
            ) : (
              <>
                {cinema && (
                  <div className="column is-one-half-desktop is-one-half-tablet is-full-mobile kino-scroll">
                    <CinemaDetails
                      {...cinema}
                      user={user?._id || null}
                      cinemaId={cinemaId || ""}
                    />
                  </div>
                )}

                <div className="column is-one-half-desktop is-one-half-tablet is-full-mobile kino-scroll">
                  <div id="events-thread">
                    <div className="kino-event-thread-header">
                      <p className="subtitle has-text-white-ter ml-3 mt-3">
                        Events hosted at {cinema?.name}
                      </p>
                      {user ? (
                        <Link to={`/cinemas/${cinemaId}/post-event`}>
                          <button className="button is-link">Add a post</button>
                        </Link>
                      ) : (
                        <p>
                          <Link to={"/login"}>Login </Link>to add a post
                        </p>
                      )}
                    </div>
                    <div>
                      {events.length > 0 ? (
                        events.map((event) => (
                          <EventsThread {...event} key={event._id} />
                        ))
                      ) : (
                        <p className="has-text-centered kino-event-thread-header">
                          No events have been posted at {cinema?.name}.
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CinemaNoticeBoard;
