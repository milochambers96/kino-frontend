import { IEvent } from "../../interfaces/event";
import { Link } from "react-router-dom";

function EventsThread({
  _id,
  title,
  image,
  author,
  createdAt,
  description,
}: IEvent) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <article className="media ml-5 box kino-grey">
      <figure className="media-left">
        <p className="image is-64x64">
          <img src={image} alt={`image for ${title}`} />
        </p>
      </figure>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>{title}</strong>
            <small>
              {" "}
              posted by {author.username} on {formattedDate}
            </small>
            <p className="has-text-white-ter mt-2">{description}</p>
            <button className="button is-small mt-2">
              <Link to={`/events/${_id}`}>Find out more</Link>
            </button>
          </p>
        </div>
      </div>
    </article>
  );
}

export default EventsThread;
