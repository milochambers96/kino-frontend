import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BoroughSelector from "./BoroughSelector";

function PostCinema() {
  const [formData, setFormData] = useState({
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
  });

  const [formErrorData, setFormErrorData] = useState({
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
  });

  const navigate = useNavigate();

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const fieldName = targetElement.name;

    const newFormData = { ...formData, [fieldName]: targetElement.value };
    setFormData(newFormData);
  }

  function combineAddress() {
    const { buildingNumber, street, city, postcode } = formData;
    return `${buildingNumber} ${street}, ${city}, ${postcode}`;
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const combinedAddress = combineAddress();
      const completeCinemaData = {
        ...formData,
        address: combinedAddress,
      };
      const token = localStorage.getItem("token");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        "http://localhost:8000/api/cinemas",
        completeCinemaData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/cinemas");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("THE ERROR IS: ", error);
      setFormErrorData(error.response.data.errors);
    }
  }

  return (
    <div className="section has-background-primary">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-three-quarters-tablet is-full-mobile">
            <form
              className="box has-background-danger-dark is-radius-medium"
              onSubmit={handleSubmit}
            >
              <fieldset className="box">
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
                      <small className="has-text-warning">
                        {formErrorData.name}
                      </small>
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
                  </div>
                </div>
              </fieldset>
              <fieldset className="box">
                <legend className="title">Address</legend>
                <div className="field">
                  <label htmlFor="buildingNumber" className="label">
                    Building Number
                  </label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      name="buildingNumber"
                      value={formData.buildingNumber}
                      onChange={handleChange}
                    />
                  </div>
                </div>

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
              </fieldset>
              <fieldset className="box">
                <legend className="title">Location</legend>
                <div className="field">
                  <label className="label">Area</label>
                  <div className="control">
                    <div className="select">
                      <select
                        name="area"
                        value={formData.area}
                        onChange={handleChange}
                      >
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

                <BoroughSelector
                  boroughData={formData.borough}
                  area={formData.area}
                  updateBoroughData={handleChange}
                />
              </fieldset>
              <fieldset className="box">
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
                    />
                  </div>
                </div>
              </fieldset>
              <div className="field is-flex is-justify-content-center">
                <button className="button">Post Cinema</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCinema;
