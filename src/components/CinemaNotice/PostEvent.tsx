import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import EventForm from "../Forms & Utility Components/EventForm";
import { baseUrl } from "../../config";

function PostEvent() {
  const [formErrorData, setFormErrorData] = useState({});
  const { cinemaId } = useParams();

  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(completeEventData: any) {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${baseUrl}/cinemas/${cinemaId}/events`,
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
    <section className="section mt-5">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half">
            <div className="kino-form">
              <EventForm
                initialData={{
                  title: "",
                  image: "",
                  description: "",
                  specificStartDate: "",
                  specificEndDate: "",
                  recurringDate: "",
                  eventLink: "",
                }}
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

export default PostEvent;
