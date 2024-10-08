import { useState, SyntheticEvent } from "react";
import { EventFormData } from "../../interfaces/eventForm";
import { cloudinaryUpload } from "./ImageUploader";

interface FormProps {
  initialData: EventFormData;
  onSubmit: (formData: EventFormData) => Promise<void>;
  formErrorData: Partial<Record<keyof EventFormData, string>>;
}

function EventForm({ initialData, onSubmit, formErrorData }: FormProps) {
  const [formData, setFormData] = useState({
    ...initialData,
    specificDate: "",
    recurringDate: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [eventDateType, setEventDateType] = useState("specific");

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const fieldName = targetElement.name;

    const newFormData = { ...formData, [fieldName]: targetElement.value };
    setFormData(newFormData);
  }

  function handleFileChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    if (targetElement.files && targetElement.files.length > 0) {
      setImageFile(targetElement.files[0]);
    }
  }

  function handleDateTypeChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    setEventDateType(targetElement.value);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const completeEventData = {
      ...formData,
      dateType: eventDateType,
      eventDate:
        eventDateType === "recurring"
          ? formData.recurringDate
          : formData.specificDate,
    };

    if (imageFile) {
      try {
        const imageUrl = await cloudinaryUpload(imageFile);
        completeEventData.image = imageUrl;
      } catch (error) {
        console.error(error);
      }
    }

    await onSubmit(completeEventData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title" className="label">
          Event Title
        </label>
        <div className="control">
          <input
            type="text"
            className="input"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
          {formErrorData.title && (
            <small className="has-text-warning">{formErrorData.title}</small>
          )}
        </div>
      </div>

      <div className="field">
        <label htmlFor="description" className="label">
          Event Description
        </label>
        <div className="control">
          <textarea
            className="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {formErrorData.description && (
            <small className="has-text-warning">
              {formErrorData.description}
            </small>
          )}
        </div>
      </div>

      <div className="field mb-5">
        <label className="label">Event Image</label>
        <div className="control">
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {formErrorData.image && (
            <small className="has-text-warning">{formErrorData.image}</small>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label">Event Link</label>
        <div className="control">
          <input
            className="input"
            type="text"
            name="eventLink"
            value={formData.eventLink}
            onChange={handleChange}
          />
          {formErrorData.eventLink && (
            <small className="has-text-warning">
              {formErrorData.eventLink}
            </small>
          )}
        </div>
      </div>

      <div className="field">
        <label className="label">Select Date Type</label>
        <div className="control" style={{ marginBottom: "1rem" }}>
          <label className="radio" style={{ marginRight: "20px" }}>
            <input
              type="radio"
              name="dateType"
              value="specific"
              checked={eventDateType === "specific"}
              onChange={handleDateTypeChange}
            />
            Specific Date
          </label>
          <label className="radio">
            <input
              type="radio"
              name="dateType"
              value="recurring"
              checked={eventDateType === "recurring"}
              onChange={handleDateTypeChange}
            />
            Recurring
          </label>
        </div>
      </div>

      {eventDateType === "specific" && (
        <>
          <div className="field">
            <label className="label">Start Date</label>
            <div className="control">
              <input
                type="date"
                className="input"
                name="specificStartDate"
                value={formData.specificStartDate}
                onChange={handleChange}
              />
              {formErrorData.specificStartDate && (
                <small className="has-text-warning">
                  {formErrorData.specificStartDate}
                </small>
              )}
            </div>
          </div>

          <div className="field">
            <label className="label">End Date</label>
            <div className="control">
              <input
                type="date"
                className="input"
                name="specificEndDate"
                value={formData.specificEndDate}
                onChange={handleChange}
              />
              {formErrorData.specificEndDate && (
                <small className="has-text-warning">
                  {formErrorData.specificEndDate}
                </small>
              )}
            </div>
          </div>
        </>
      )}

      {eventDateType === "recurring" && (
        <div className="field">
          <label className="label">Recurring Date Description</label>
          <div className="control">
            <input
              type="text"
              className="input"
              name="recurringDate"
              value={formData.recurringDate}
              onChange={handleChange}
              placeholder="e.g., Weekly, Every Monday"
            />
            {formErrorData.recurringDate && (
              <small className="has-text-warning">
                {formErrorData.recurringDate}
              </small>
            )}
          </div>
        </div>
      )}

      <div className="field is-grouped is-grouped-centered">
        <button className="button is-link" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default EventForm;
