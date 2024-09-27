import { ICinema } from "../../interfaces/cinema";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../../config";

interface CinemaDetailsProps extends ICinema {
  user: string | null;
  cinemaId: string;
}

function CinemaDetails({
  name,
  image,
  address,
  bio,
  yearEst,
  screens,
  capacity,
  website,
  owner,
  user,
  cinemaId,
}: CinemaDetailsProps) {
  const navigate = useNavigate();

  async function deleteCinema() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${baseUrl}/cinemas/${cinemaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cinemas");
    } catch (error: unknown) {
      console.error("The error is:", error);
    }
  }

  return (
    <div id="cinema-details" className="card kino-grey has-text-white-ter">
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
          {yearEst && (
            <p>
              <strong>Year Established:</strong> {yearEst}
            </p>
          )}
          {screens && (
            <p>
              <strong>Screens:</strong> {screens}
            </p>
          )}
          {capacity && (
            <p>
              <strong>Capacity:</strong> {capacity}
            </p>
          )}
          <p>{bio}</p>
          <p>
            Discover more about {name}{" "}
            <a href={website} target="_blank" rel="noopener noreferrer">
              here.
            </a>
          </p>
        </div>
      </div>
      {owner === user && (
        <div className="columns is-centered">
          <div className="column is-narrow">
            <button
              onClick={deleteCinema}
              className="button has-background-danger-20 "
            >
              Remove Cinema
            </button>
          </div>
          <div className="column is-narrow">
            <Link to={`/edit-cinema/${cinemaId}`}>
              <button className="button is-link">Update Cinema</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default CinemaDetails;
