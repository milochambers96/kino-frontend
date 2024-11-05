import { IEvent } from "../../interfaces/event";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../config";

interface EventDetailsProps extends IEvent {
  user: string | null;
  eventId: string;
}
function EventDetails({
  title,
  location,
  author,
  image,
  description,
  specificStartDate,
  specificEndDate,
  recurringDate,
  eventLink,
  user,
  eventId,
}: EventDetailsProps) {
  const navigate = useNavigate();
  const formattedStartDate = new Date(specificStartDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const formattedEndDate = new Date(specificEndDate).toLocaleDateString(
    "en-GB",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );

  const cinemaId = location._id;

  async function deleteEvent() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/cinemas/${cinemaId}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/cinemas/${cinemaId}`);
    } catch (error: unknown) {
      console.error("The follow error occured when deleting an event:", error);
    }
  }

  return (
    <div id="event-details" className="card kino-grey has-text-white-ter">
      <header className="card-header">
        <h2 className="card-header-title">
          {title}
          {" @ "}
          <Link className="has-text-link" to={`/cinemas/${cinemaId}`}>
            {location.name}
          </Link>
        </h2>
      </header>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={`An image for ${title}`} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <p className="has-text-justified">{description}</p>

          <p>
            Notice posted by <strong>{author.username}</strong>
          </p>
          {!recurringDate && (
            <p>
              Running from: {formattedStartDate} to {formattedEndDate}
            </p>
          )}
          {recurringDate && (
            <p>
              <strong>When?</strong> {recurringDate}
            </p>
          )}
          <p>
            Discover more about {title}{" "}
            <a
              className="has-text-link"
              href={eventLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </p>
        </div>
      </div>
      {(user === author._id || user === location.owner) && (
        <div className="columns is-centered">
          <div className="column is-narrow">
            <button
              onClick={deleteEvent}
              className="button has-background-danger-20"
            >
              Remove Event
            </button>
          </div>
          <div className="column is-narrow">
            <Link to={`/events/${eventId}/update-event`}>
              <button className="button is-link">Update Event</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventDetails;
