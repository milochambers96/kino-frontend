import { IEvent } from "../../interfaces/event";

function EventNoticeBoard({
  title,
  location,
  author,
  image,
  description,
  specificDate,
  recurringDate,
  eventLink,
}: IEvent) {
  const formattedDate = specificDate ? specificDate.toLocaleDateString() : "";

  return (
    <div id="event-details" className="card">
      <header className="card-header">
        <p className="card-header-title">{title}</p>
      </header>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={`An image for ${title}`} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <p>{description}</p>
          <p>
            Event hosted @ <strong>{location.name}</strong>
          </p>
          <p>
            Notice posted by <strong>{author.username}</strong>
          </p>
          {formattedDate && <p>Date: {formattedDate}</p>}
          {recurringDate && (
            <p>
              <strong>When?</strong> {recurringDate}
            </p>
          )}
          <p>
            Discover more about {title}{" "}
            <a href={eventLink} target="_blank" rel="noopener noreferrer">
              here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventNoticeBoard;
