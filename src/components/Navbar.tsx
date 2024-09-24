import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface NavbarProps {
  user: null | IUser;
  setUser: Function;
}

function Navbar({ user, setUser, isCinemaOwner }: NavbarProps) {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <>
      <header>
        <nav className="navbar is-dark">
          <div className="container">
            <div className="navbar-brand">
              <Link to="/" className="navbar-item">
                Home
              </Link>
              <Link to="/cinemas" className="navbar-item">
                All Cinemas
              </Link>
              <Link to="/cinemas-map" className="navbar-item">
                Find your local Cinema
              </Link>
              {!user && (
                <Link to="/signup" className="navbar-item">
                  Signup
                </Link>
              )}
              {!user && (
                <Link to="/login" className="navbar-item">
                  Login
                </Link>
              )}
              {isCinemaOwner && (
                <Link to="/post-cinema" className="navbar-item">
                  Upload A Cinema
                </Link>
              )}
              {user && (
                <button
                  onClick={logout}
                  className="button navbar-item is-ghost"
                >
                  Logout
                </button>
              )}
              {user && (
                <span className="navbar-item ">{`Welcome back ${user.username}`}</span>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
