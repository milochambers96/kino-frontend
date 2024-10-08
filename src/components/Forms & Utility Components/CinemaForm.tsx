import { useState, SyntheticEvent } from "react";
import { CinemaFormData } from "../../interfaces/cinemaForm";
import { cloudinaryUpload } from "./ImageUploader";
import BoroughSelector from "./BoroughSelector";

interface FormProps {
  initialData: CinemaFormData;
  onSubmit: (formData: CinemaFormData) => Promise<void>;
  formErrorData: Partial<Record<keyof CinemaFormData, string>>;
}

function CinemaForm({ initialData, onSubmit, formErrorData }: FormProps) {
  const [formData, setFormData] = useState(initialData);
  const [imageFile, setImageFile] = useState<File | null>(null);

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

  function combineAddress() {
    const { buildingNo, street, city, postcode } = formData;
    return `${buildingNo} ${street}, ${city}, ${postcode}`;
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const combinedAddress = combineAddress();
    const completeCinemaData = {
      ...formData,
      address: combinedAddress,
    };

    if (imageFile) {
      try {
        const imageUrl = await cloudinaryUpload(imageFile);
        completeCinemaData.image = imageUrl;
      } catch (error) {
        console.error(error);
      }
    }

    console.log("Comp form:", completeCinemaData);
    await onSubmit(completeCinemaData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <fieldset className="mb-6">
        <legend className="title">Basic Information</legend>
        <div className="field">
          <label htmlFor="name" className="label">
            Cinema Name:
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {formErrorData.name && (
              <small className="has-text-warning">{formErrorData.name}</small>
            )}
          </div>
        </div>
        <div className="field">
          <label htmlFor="bio" className="label">
            Cinema Bio
          </label>
          <div className="control">
            <textarea
              name="bio"
              className="textarea"
              value={formData.bio}
              onChange={handleChange}
            ></textarea>
            {formErrorData.bio && (
              <small className="has-text-warning">{formErrorData.bio}</small>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Website</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
            {formErrorData.website && (
              <small className="has-text-warning">
                {formErrorData.website}
              </small>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Cinema Picture</label>
          <div className="control">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {formErrorData.image && (
              <small className="has-text-warning">{formErrorData.image}</small>
            )}
          </div>
        </div>
      </fieldset>
      <fieldset className="mb-3">
        <legend className="title">Address</legend>
        <div className="field">
          <label htmlFor="buildingNo" className="label">
            Building Number
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              name="buildingNo"
              value={formData.buildingNo}
              onChange={handleChange}
            />
          </div>
        </div>
        {formErrorData.buildingNo && (
          <small className="has-text-warning">{formErrorData.buildingNo}</small>
        )}

        <div className="field">
          <label htmlFor="street" className="label">
            Street
          </label>
          <div className="control">
            <input
              type="text"
              className="input"
              name="street"
              value={formData.street}
              onChange={handleChange}
            />
          </div>
        </div>
        {formErrorData.street && (
          <small className="has-text-warning">{formErrorData.street}</small>
        )}

        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="city"
              value={formData.city}
              readOnly
            />
          </div>
        </div>
        {formErrorData.city && (
          <small className="has-text-warning">{formErrorData.city}</small>
        )}

        <div className="field">
          <label className="label">Postcode</label>
          <div className="control">
            <input
              className="input"
              type="text"
              name="postcode"
              value={formData.postcode}
              onChange={handleChange}
            />
          </div>
        </div>
        {formErrorData.postcode && (
          <small className="has-text-warning">{formErrorData.postcode}</small>
        )}
      </fieldset>
      <fieldset className="mb-3">
        <legend className="title">Location</legend>
        <div className="field">
          <label className="label">Area</label>
          <div className="control">
            <div className="select">
              <select name="area" value={formData.area} onChange={handleChange}>
                <option value="">Select an area</option>
                <option value="North">North</option>
                <option value="East">East</option>
                <option value="South">South</option>
                <option value="West">West</option>
                <option value="Central">Central</option>
              </select>
            </div>
          </div>
        </div>
        {formErrorData.area && (
          <small className="has-text-warning">{formErrorData.area}</small>
        )}

        <BoroughSelector
          boroughData={formData.borough}
          area={formData.area}
          updateBoroughData={handleChange}
        />
        {formErrorData.borough && (
          <small className="has-text-warning">{formErrorData.borough}</small>
        )}
      </fieldset>
      <fieldset className="mb-3">
        <legend className="title">Additional Information</legend>
        <div className="field">
          <label className="label">Year Established</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="yearEst"
              value={formData.yearEst}
              onChange={handleChange}
              style={{ appearance: "textfield" }}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Number of Screens</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="screens"
              value={formData.screens}
              onChange={handleChange}
              style={{ appearance: "textfield" }}
            />
          </div>
        </div>

        <div className="field">
          <label className="label">Capacity</label>
          <div className="control">
            <input
              className="input"
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              style={{ appearance: "textfield" }}
            />
          </div>
        </div>
      </fieldset>
      <div className="field is-flex is-justify-content-center">
        <button className="button is-link">Submit</button>
      </div>
    </form>
  );
}

export default CinemaForm;
