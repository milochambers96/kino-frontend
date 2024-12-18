import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { baseUrl } from "../config";

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
function Login({ fetchUser }: { fetchUser: Function }) {
  const [formData, setformData] = useState({
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
      ...formData,
      [fieldName]: targetElement.value,
    };
    setformData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}/login`, formData);
      localStorage.setItem("token", response.data.token);
      fetchUser();
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
    <section
      className="section is-flex is-justify-content-center is-align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half-desktop is-three-quarters-tablet is-full-mobile">
            <form onSubmit={handleSubmit} className="kino-form">
              <div className="field">
                <label htmlFor="email" className="label">
                  Email:
                </label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    name="email"
                    value={formData.email}
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
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {formErrorData.password && (
                    <small className="has-text-warning">
                      {formErrorData.password}
                    </small>
                  )}
                </div>
              </div>
              <div className="field is-flex is-justify-content-center mt-3">
                <button className="button is-link">Login</button>
              </div>
              <div className="has-text-centered mt-5">
                <p>
                  Don't have an account? Signup <Link to={"/signup"}>here</Link>{" "}
                  to connect with the Kino community.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
