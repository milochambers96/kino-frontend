import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IEvent } from "../../interfaces/event";
import { IComment } from "../../interfaces/comment";
import EventNoticeBoard from "./EventNoticeBoard";
import CommentsThread from "./CommentsThread";
import CommentBox from "./CommentBox";
import { IUser } from "../../interfaces/user";

function ShowEvent({ user }: { user: null | IUser }) {
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
    fetchEvent();
    fetchComments();
  }, [eventId]);

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

  return (
    <section className="section">
      <div className="container mt-5">
        <div className="columns is-multiline is-centered">
          {isEventInfoLoading ? (
            <p className="has-text-centered title">Loading...</p>
          ) : (
            <>
              {event && (
                <div className="column is-half">
                  <EventNoticeBoard
                    {...event}
                    user={user?._id || null}
                    eventId={eventId || ""}
                  />
                </div>
              )}

              <div className="column is-half">
                <p className="has-text-centered subtitle mb-5">
                  Discussion board for {event?.title}
                </p>

                {/* CommentBox */}
                {user ? (
                  <CommentBox
                    eventId={eventId || ""}
                    fetchComments={fetchComments}
                  />
                ) : (
                  <p className="has-text-centered">Login to post a comment</p>
                )}

                {/* CommentsThread */}
                {comments.length > 0 ? (
                  <div id="events-thread">
                    {comments.map((comment) => (
                      <CommentsThread
                        {...comment}
                        key={comment._id}
                        user={user?._id || null}
                        eventAuthor={event?.author._id || ""}
                        fetchComments={fetchComments}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="has-text-centered subtitle">
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
