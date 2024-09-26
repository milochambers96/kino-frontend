import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CinemaForm from "../Forms & Utility Components/CinemaForm";

function PostCinema() {
  const [formErrorData, setFormErrorData] = useState({});
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(completeCinemaData: any) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8000/api/cinemas",
        completeCinemaData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/cinemas");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFormErrorData(error.response.data.errors);
    }
  }

  return (
    <div className="section mt-5">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <CinemaForm
              initialData={{
                name: "",
                bio: "",
                area: "",
                borough: "",
                image: "",
                website: "",
                yearEst: 0,
                screens: 0,
                capacity: 0,
                buildingNumber: "",
                street: "",
                city: "London",
                postcode: "",
              }}
              onSubmit={handleSubmit}
              formErrorData={formErrorData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCinema;
