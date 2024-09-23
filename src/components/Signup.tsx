import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      const resp = await axios.post(
        "http://localhost:8000/api/signup",
        signupFormData
      );
      navigate("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        // Handle Axios error
        if (error.response) {
          // If there's a response from the server
          setFormErrorData(error.response.data.errors);
        } else {
          console.error("Error with no response:", error.message);
        }
      } else {
        // Handle non-Axios error
        console.error("Unexpected error:", error);
      }
    }
  }

  return (
    <div className="section">
      <div className="container">
        <form onSubmit={handleSubmit}>
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
                <small className="has-text-warning">{formErrorData.role}</small>
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
          <button className="button">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;
