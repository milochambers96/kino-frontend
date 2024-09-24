import { ICinema } from "../../interfaces/cinema";

function CinemaNoticeBoard({
  name,
  image,
  address,
  bio,
  yearEst,
  screens,
  capacity,
  website,
}: ICinema) {
  return (
    <div id="cinema-details" className="card">
      <header className="card-header">
        <p className="card-header-title">{name}</p>
      </header>
      <div className="card-image">
        <figure className="image is-4by3">
          <img src={image} alt={`An image of ${name}`} />
        </figure>
      </div>
      <div className="card-content">
        <div className="content">
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Year Established:</strong> {yearEst}
          </p>
          <p>
            <strong>Screens:</strong> {screens}
          </p>
          <p>
            <strong>Capacity:</strong> {capacity}
          </p>
          <p>{bio}</p>
          <p>
            Discover more about {name}{" "}
            <a href={website} target="_blank" rel="noopener noreferrer">
              here.
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default CinemaNoticeBoard;
