import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import EventForm from "../Forms & Utility Components/EventForm";
import { baseUrl } from "../../config";

function UpdateEvent() {
  const { eventId } = useParams();

  const [formErrorData, setFormErrorData] = useState({});
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchEvent() {
      const response = await axios.get(`${baseUrl}/events/${eventId}`);
      setInitialData(response.data);
    }

    fetchEvent();
  }, [eventId]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function handleSubmit(completeEventData: any) {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${baseUrl}/events/${eventId}`, completeEventData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/events/${eventId}`);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setFormErrorData(error.response.data.errors);
    }
  }

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kino-background">
      <div className="section mt-5">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half">
              <div className="kino-form">
                <EventForm
                  initialData={initialData}
                  onSubmit={handleSubmit}
                  formErrorData={formErrorData}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateEvent;
