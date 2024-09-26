import { useState, SyntheticEvent } from "react";

function EventForm({ initialData, onSubmit, formErrorData }) {
  const [formData, setFormData] = useState({
    ...initialData,
    specificDate: "",
    recurringDate: "",
  });
  const [eventDateType, setEventDateType] = useState("specific");

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const fieldName = targetElement.name;

    const newFormData = { ...formData, [fieldName]: targetElement.value };
    setFormData(newFormData);
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
    await onSubmit(completeEventData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="box">
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

        <div className="field">
          <label className="label">Image</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
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
      </fieldset>
    </form>
  );
}

export default EventForm;
