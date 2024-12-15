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
  const [mobileTab, setMobileTab] = useState("cinema");
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
    <div className="kino-gradient">
      <section className="section">
        <div className="container mt-5">
          <div className="columns is-multiline is-centered is-hidden-mobile">
            {isLoading ? (
              <FullPageLoader />
            ) : (
              <>
                {cinema && (
                  <div className="column is-one-half-desktop is-one-half-tablet kino-scroll">
                    <CinemaDetails
                      {...cinema}
                      user={user?._id || null}
                      cinemaId={cinemaId || ""}
                    />
                  </div>
                )}

                <div className="column is-one-half-desktop is-one-half-tablet kino-scroll">
                  <div id="events-thread">
                    <div className="box kino-grey">
                      <h2 className="has-text-white-ter has-text-centered is-size-5">
                        Events at {cinema?.name}
                      </h2>
                      <br />
                      {user ? (
                        <div className="level">
                          <div className="level-item has-text-centered">
                            <Link to={`/cinemas/${cinemaId}/post-event`}>
                              <button className="button is-link">
                                Add a post
                              </button>
                            </Link>
                          </div>
                        </div>
                      ) : (
                        <p className="has-text-centered">
                          <Link to={"/login"}>
                            <span className="has-text-link">Login</span>{" "}
                          </Link>
                          to post an event
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
          <div className="is-hidden-desktop is-hidden-tablet">
            <div className="tabs is-centered">
              <ul>
                <li className={mobileTab === "cinema" ? "is-active" : ""}>
                  <a onClick={() => setMobileTab("cinema")}>Cinema Bio</a>
                </li>
                <li className={mobileTab === "events" ? "is-active" : ""}>
                  <a onClick={() => setMobileTab("events")}>Events Thread</a>
                </li>
              </ul>
            </div>
            <div className="columns is-multiline is-centered kino-scroll">
              {isLoading ? (
                <FullPageLoader />
              ) : (
                <>
                  {cinema && mobileTab === "cinema" && (
                    <div className="column is-full-mobile ">
                      <CinemaDetails
                        {...cinema}
                        user={user?._id || null}
                        cinemaId={cinemaId || ""}
                      />
                    </div>
                  )}
                  {events && mobileTab === "events" && (
                    <div className="column is-full-mobile kino-scroll">
                      <div id="events-thread">
                        <div className="box kino-grey">
                          <h2 className="has-text-white-ter has-text-centered is-size-5">
                            Events at {cinema?.name}
                          </h2>
                          <br />
                          {user ? (
                            <div className="level">
                              <div className="level-item has-text-centered">
                                <Link to={`/cinemas/${cinemaId}/post-event`}>
                                  <button className="button is-link">
                                    Add a post
                                  </button>
                                </Link>
                              </div>
                            </div>
                          ) : (
                            <p className="has-text-centered">
                              <Link to={"/login"}>
                                <span className="has-text-link">Login</span>{" "}
                              </Link>
                              to post an event
                            </p>
                          )}
                        </div>
                        <div className="kino-scroll">
                          {events.length > 0 ? (
                            events.map((event) => (
                              <EventsThread {...event} key={event._id} />
                            ))
                          ) : (
                            <p className="has-text-justified kino-event-thread-header">
                              No events currently posted at {cinema?.name}.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CinemaNoticeBoard;
