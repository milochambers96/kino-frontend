import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrorData, setFormErrorData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(e: SyntheticEvent) {
    const targetElement = e.target as HTMLInputElement;
    const fieldName = targetElement.name;
    const newFormData = {
      ...loginFormData,
      [fieldName]: targetElement.value,
    };
    setLoginFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post(
        "http://localhost:8000/api/login",
        loginFormData
      );
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setFormErrorData(error.response.data.message);
        } else {
          console.error("Error with no response:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
    }
  }

  return (
    <div className="section ">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-three-quarters-tablet is-full-mobile">
            <form
              onSubmit={handleSubmit}
              className="box has-background-danger-dark is-radius-medium"
            >
              <div className="field">
                <label htmlFor="email" className="label">
                  Email:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={loginFormData.email}
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
                <label htmlFor="password" className="label">
                  Password:
                </label>
                <div className="control">
                  <input
                    type="password"
                    className="input"
                    name="password"
                    value={loginFormData.password}
                    onChange={handleChange}
                  />
                  {formErrorData.password && (
                    <small className="has-text-warning">
                      {formErrorData.password}
                    </small>
                  )}
                </div>
              </div>
              <div className="field is-flex is-justify-content-center">
                <button className="button">Login</button>
              </div>{" "}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
