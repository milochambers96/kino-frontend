import { ICinema } from "../../interfaces/cinema";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface NoticeBoardProps extends ICinema {
  user: string | null;
  cinemaId: string;
}

function CinemaNoticeBoard({
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
}: NoticeBoardProps) {
  const navigate = useNavigate();

  async function deleteCinema() {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/movies/${cinemaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/cinemas");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("The error is:", error);
    }
  }

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
      {owner === user && (
        <div className="column">
          <button onClick={deleteCinema} className="button  is-danger">
            Remove Cinema
          </button>
          {/* <button
                        onClick={updateCinema}
                        className="button is-primary"
                      ></button> */}
        </div>
      )}
    </div>
  );
}

export default CinemaNoticeBoard;
