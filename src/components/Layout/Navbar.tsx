import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { IUser } from "../../interfaces/user";

interface NavbarProps {
  user: null | IUser;
  setUser: (user: IUser | null) => void;
  isCinemaOwner: boolean;
}

function Navbar({ user, setUser, isCinemaOwner }: NavbarProps) {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();

  function toggleBurger() {
    setIsActive(!isActive);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <header>
        <nav className="navbar has-background-danger-dark is-fixed-top">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item has-text-white-ter">
                Home
              </Link>

              {user && (
                <>
                  <span className="navbar-item has-text-white-ter is-hidden-desktop">
                    {`Hi ${user.username}, welcome back to Kino Connect`}
                  </span>
                </>
              )}

              {/* Burger button for mobile */}
              <a
                role="button"
                className={`navbar-burger ${isActive ? "is-active" : ""}`}
                aria-label="menu"
                aria-expanded="false"
                onClick={toggleBurger}
              >
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
                <span aria-hidden="true"></span>
              </a>
            </div>

            {/* Navbar menu that toggles on burger click */}
            <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
              <div className="navbar-start">
                <Link to="/cinemas" className="navbar-item has-text-white-ter">
                  All Cinemas
                </Link>
                <Link
                  to="/cinemas-map"
                  className="navbar-item has-text-white-ter"
                >
                  Find your local Cinema
                </Link>
                {isCinemaOwner && (
                  <Link
                    to="/post-cinema"
                    className="navbar-item has-text-white-ter"
                  >
                    Upload A Cinema
                  </Link>
                )}
              </div>

              <div className="navbar-end">
                {!user && (
                  <>
                    <Link
                      to="/signup"
                      className="navbar-item has-text-white-ter"
                    >
                      Signup
                    </Link>
                    <Link
                      to="/login"
                      className="navbar-item has-text-white-ter"
                    >
                      Login
                    </Link>
                  </>
                )}

                {user && (
                  <>
                    <span className="navbar-item has-text-white-ter is-hidden-touch">
                      {`Hi ${user.username}, welcome back to Kino Connect`}
                    </span>
                    <button
                      onClick={logout}
                      className="button navbar-item is-ghost"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
