import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../config";

function Signup() {
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    passwordConfirmation: "",
  });

  const [formErrorData, setFormErrorData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    passwordConfirmation: "",
  });

  const navigate = useNavigate();

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const fieldName = targetElement.name;
    const newFormData = { ...signupFormData, [fieldName]: targetElement.value };
    setSignupFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      await axios.post(`${baseUrl}/signup`, signupFormData);
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setFormErrorData(error.response.data.errors);
        } else {
          console.error("Error with no response:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  return (
    <section
      className="section is-flex is-justify-content-center is-align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-three-quarters-tablet is-full-mobile">
            <form onSubmit={handleSubmit} className="kino-form">
              <div className="field">
                <label htmlFor="username" className="label">
                  Username:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="username"
                    value={signupFormData.username}
                    onChange={handleChange}
                  />
                  {formErrorData.username && (
                    <small className="has-text-warning">
                      {formErrorData.username}
                    </small>
                  )}
                </div>
              </div>
              <div className="field">
                <label htmlFor="email" className="label">
                  Email:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={signupFormData.email}
                    onChange={handleChange}
                  />
                  {formErrorData.email && (
                    <small className="has-text-warning">
                      {formErrorData.email}
                    </small>
                  )}
                </div>
              </div>
              <div className="field">
                <label htmlFor="role" className="label">
                  Account Type:
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      name="role"
                      value={signupFormData.role}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Select Account Type
                      </option>
                      <option value="Cinema">Cinema</option>
                      <option value="Film Fanatic">Film Fanatic</option>
                    </select>
                  </div>
                  {formErrorData.role && (
                    <small className="has-text-warning">
                      {formErrorData.role}
                    </small>
                  )}
                </div>
              </div>
              <div className="field">
                <label htmlFor="password" className="label">
                  Password:
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={signupFormData.password}
                    onChange={handleChange}
                  />
                  {formErrorData.password && (
                    <small className="has-text-warning">
                      {formErrorData.password}
                    </small>
                  )}
                </div>
              </div>
              <div className="field">
                <label htmlFor="passwordConfirmation" className="label">
                  Password Confirmation:
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="passwordConfirmation"
                    value={signupFormData.passwordConfirmation}
                    onChange={handleChange}
                  />
                  {formErrorData.passwordConfirmation && (
                    <small className="has-text-warning">
                      {formErrorData.passwordConfirmation}
                    </small>
                  )}
                </div>
              </div>
              <div className="field is-flex is-justify-content-center mt-4">
                <button className="button is-link">Signup</button>
              </div>
              <div className="has-text-centered mt-5">
                <p>
                  Already have an account? Re-connect with the Kino community{" "}
                  <Link to={"/login"} className="has-text-link">
                    here
                  </Link>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Signup;
