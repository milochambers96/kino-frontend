import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { IUser } from "../../interfaces/user";
import { IEvent } from "../../interfaces/event";
import { IComment } from "../../interfaces/comment";
import EventDetails from "./EventDetails";
import CommentsThread from "./CommentsThread";
import CommentBox from "./CommentBox";
import FullPageLoader from "../Forms & Utility Components/FullPageLoader";
import { baseUrl } from "../../config";

function EventNoticeBoard({ user }: { user: null | IUser }) {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();

  const fetchComments = useCallback(async () => {
    console.log("Fetching comments for event ID:", eventId);
    try {
      const resp = await fetch(`${baseUrl}/events/${eventId}/comments`);

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
      setIsLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    async function fetchEvent() {
      console.log("Fetching event with ID:", eventId);
      const resp = await fetch(`${baseUrl}/events/${eventId}`);

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
  }, [eventId, fetchComments]);

  return (
    <section className="section kino-gradient">
      <div className="container mt-5">
        <div className="columns is-multiline is-centered">
          {isLoading ? (
            <FullPageLoader />
          ) : (
            <>
              {event && (
                <div className="column is-half kino-scroll">
                  <EventDetails
                    {...event}
                    user={user?._id || null}
                    eventId={eventId || ""}
                  />
                </div>
              )}

              <div className="column is-half kino-scroll">
                {user ? (
                  <CommentBox
                    eventId={eventId || ""}
                    fetchComments={fetchComments}
                  />
                ) : (
                  <p className="subtitle kino-grey kino-comment has-text-white-ter">
                    <span>
                      <Link to="/login">Login </Link>
                    </span>
                    to post a comment
                  </p>
                )}

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
                  <p className="subtitle kino-grey kino-comment has-text-white-ter">
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

export default EventNoticeBoard;
