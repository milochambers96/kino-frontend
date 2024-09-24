import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IUser } from "../../interfaces/user";
import { ICinema } from "../../interfaces/cinema";
import { IEvent } from "../../interfaces/event";
import CinemaNoticeBoard from "./CinemaNoticeBoard";
import EventsThread from "./EventsThread";

function ShowCinema({ user }: { user: null | IUser }) {
  const [cinema, setCinema] = useState<ICinema | null>(null);
  const [events, setEvents] = useState<IEvent[]>([]);
  const [isCinemaInfoLoading, setIsCinemaInfoLoading] = useState(true);

  const { cinemaId } = useParams();

  useEffect(() => {
    async function fetchCinema() {
      const resp = await fetch(`http://localhost:8000/api/cinemas/${cinemaId}`);
      const cinemaData = await resp.json();
      setCinema(cinemaData);
    }
    async function fetchEvents() {
      const resp = await fetch(
        `http://localhost:8000/api/cinemas/${cinemaId}/events`
      );
      const { cinemaEvents } = await resp.json();
      setEvents(cinemaEvents);
      setIsCinemaInfoLoading(false);
    }
    fetchCinema();
    fetchEvents();
  }, [cinemaId]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-centered">
          {isCinemaInfoLoading ? (
            <p className="has-text-centered">Loading...</p>
          ) : (
            <>
              {cinema && (
                <div className="column is-one-half-desktop is-one-half-tablet is-full-mobile">
                  <CinemaNoticeBoard
                    {...cinema}
                    user={user?._id || null}
                    cinemaId={cinemaId || ""}
                  />
                </div>
              )}

              <div className="column is-one-half-desktop is-one-half-tablet is-full-mobile">
                {events.length > 0 ? (
                  <div id="events-thread">
                    <p className="has-text-centered mb-5">
                      Events hosted at {cinema?.name}
                    </p>
                    <button className="button">Add a post</button>
                    {events.map((event) => (
                      <EventsThread {...event} key={event._id} />
                    ))}
                  </div>
                ) : (
                  <p className="has-text-centered">
                    No events have been posted at {cinema?.name}.
                  </p>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ShowCinema;
