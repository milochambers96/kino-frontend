import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "../../interfaces/event";
import { IComment } from "../../interfaces/comment";
import EventNoticeBoard from "./EventNoticeBoard";
import CommentsThread from "./CommentsThread";

function ShowEvent() {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isEventInfoLoading, setIsEventInfoLoading] = useState(true);

  const { eventId } = useParams();

  useEffect(() => {
    async function fetchEvent() {
      console.log("Fetching event with ID:", eventId);
      const resp = await fetch(`http://localhost:8000/api/events/${eventId}`);

      if (!resp.ok) {
        console.error("Error fetching event:", resp.status);
        return;
      }

      const eventData = await resp.json();
      console.log("Event data received:", eventData);
      setEvent(eventData);
    }

    async function fetchComments() {
      console.log("Fetching comments for event ID:", eventId);
      try {
        const resp = await fetch(
          `http://localhost:8000/api/events/${eventId}/comments`
        );

        if (!resp.ok) {
          console.error("Error fetching comments:", resp.status);
          throw new Error(`HTTP error! status: ${resp.status}`);
        }

        const { eventComments } = await resp.json();
        console.log("Comments received:", eventComments);
        setComments(eventComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsEventInfoLoading(false);
      }
    }

    fetchEvent();
    fetchComments();
  }, [eventId]);

  return (
    <section className="section">
      <div className="container">
        <div className="columns is-multiline is-centered">
          {isEventInfoLoading ? (
            <p className="has-text-centered">Loading...</p>
          ) : (
            <>
              {event && (
                <div className="column is-one-half-desktop is-one-half-tablet is-full-mobile">
                  <EventNoticeBoard {...event} />
                </div>
              )}

              <div className="column is-one-half-desktop is-one-half-tablet is-full-mobile">
                {comments.length > 0 ? (
                  <div id="events-thread">
                    <p className="has-text-centered mb-5">
                      Discussion board for {event?.title}
                    </p>
                    {comments.map((comment) => (
                      <CommentsThread {...comment} key={comment._id} />
                    ))}
                  </div>
                ) : (
                  <p className="has-text-centered">
                    No comments have been posted for {event?.title}.
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

export default ShowEvent;
