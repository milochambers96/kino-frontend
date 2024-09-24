import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CinemaForm from "../Forms/CinemaForm";

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
    <div className="section has-background-primary">
      <div className="container">
        <CinemaForm
          initialData={{
            name: "",
            bio: "",
            address: "",
            area: "",
            borough: "",
            image: "",
            website: "",
            yearEst: "",
            screens: "",
            capacity: "",
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
  );
}

export default PostCinema;
