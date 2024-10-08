import { ICinema } from "../../interfaces/cinema";
import { Link } from "react-router-dom";

function CinemaCard({ _id, name, image, area, borough }: ICinema) {
  return (
    <div className="column is-one-third-desktop is-one-half-tablet">
      <Link to={`/cinemas/${_id}`}>
        <div className="card kino-grey has-text-white-ter">
          <div className="card-header">
            <div className="card-header-title">{name}</div>
          </div>
          <div className="card-image">
            <figure className="image fixed-image-container">
              <img
                src={image}
                alt={`An image of ${name}`}
                className="fixed-image"
              />
            </figure>
          </div>
          <div className="card-content has-text-centered">
            <p>
              {area} London - {borough}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CinemaCard;
