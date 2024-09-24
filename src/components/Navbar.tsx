import { Link, useNavigate } from "react-router-dom";
import { IUser } from "../interfaces/user";

interface NavbarProps {
  user: null | IUser;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  setUser: Function;
  isCinemaOwner: boolean;
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
              {isCinemaOwner && (
                <Link to="/post-cinema" className="navbar-item">
                  Upload A Cinema
                </Link>
              )}
            </div>

            <div className="navbar-end">
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

              {user && (
                <span className="navbar-item ">{`Hi ${user.username}, welcome back to Kino Connect`}</span>
              )}
              {user && (
                <button
                  onClick={logout}
                  className="button navbar-item is-ghost"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
