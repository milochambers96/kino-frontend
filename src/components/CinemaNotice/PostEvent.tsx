import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../Forms/EventForm";

function PostEvent() {
  const [formErrorData, setFormErrorData] = useState({});
  const { cinemaId } = useParams();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(completeEventData: any) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/cinemas/${cinemaId}/events`,
        completeEventData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate(`/cinemas/${cinemaId}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFormErrorData(error.response.data.errors);
    }
  }
  return (
    <div className="section kino-background">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <EventForm
              initialData={{
                title: "",
                image: "",
                description: "",
                specificStartDate: "",
                specificEndDate: "",
                recurringDate: "",
                eventDateType: "",
                eventLink: "",
                capacity: "",
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

export default PostEvent;
