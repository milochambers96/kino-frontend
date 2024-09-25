import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CinemaList from "./components/Post&DisplayCinemas/CinemaList";
import PostCinema from "./components/Post&DisplayCinemas/PostCinema";
import PostEvent from "./components/CinemaNotice/PostEvent";
import UpdateCinema from "./components/CinemaNotice/UpdateCinema";
import UpdateEvent from "./components/EventNotice/UpdateEvent";
import ShowCinema from "./components/CinemaNotice/ShowCinema";
import ShowEvent from "./components/EventNotice/ShowEvent";
import { IUser } from "./interfaces/user";
function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isCinemaOwner, setIsCinemaOwner] = useState(false);

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      console.log("Token is: ", token);
      const response = await axios.get("http://localhost:8000/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User data fetched:", response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    if (user?.role === "Cinema") {
      setIsCinemaOwner(true);
    } else {
      setIsCinemaOwner(false);
    }
  }, [user]);

  return (
    <Router>
      <Navbar user={user} setUser={setUser} isCinemaOwner={isCinemaOwner} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />

        <Route path="/cinemas" element={<CinemaList />} />
        <Route path="/cinemas-map" element={<p>CinemaMap</p>} />

        <Route path="/post-cinema" element={<PostCinema />} />
        <Route path="/edit-cinema/:cinemaId" element={<UpdateCinema />} />

        <Route path="/cinemas/:cinemaId" element={<ShowCinema user={user} />} />
        <Route path="/events/:eventId" element={<ShowEvent user={user} />} />

        <Route path="/cinemas/:cinemaId/post-event" element={<PostEvent />} />
        <Route path="/events/:eventId/update-event" element={<UpdateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
