import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import CinemaForm from "../Forms & Utility Components/CinemaForm";
import { baseUrl } from "../../config";

function UpdateCinema() {
  const { cinemaId } = useParams();
  const [formErrorData, setFormErrorData] = useState({});
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCinema() {
      const response = await axios.get(`${baseUrl}/cinemas/${cinemaId}`);
      setInitialData(response.data);
    }

    fetchCinema();
  }, [cinemaId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(completeCinemaData: any) {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${baseUrl}/cinemas/${cinemaId}`, completeCinemaData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/cinemas/${cinemaId}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFormErrorData(error.response.data.errors);
    }
  }

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <section className="section mt-5">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-three-quarters-tablet is-full-mobile">
            <div className="kino-form">
              <CinemaForm
                initialData={initialData}
                onSubmit={handleSubmit}
                formErrorData={formErrorData}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UpdateCinema;
