import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import CinemaList from "./components/Post&DisplayCinemas/CinemaList";
import CinemaMap from "./components/CinemaMap/CinemaMap";
import PostCinema from "./components/Post&DisplayCinemas/PostCinema";
import PostEvent from "./components/CinemaNotice/PostEvent";
import UpdateCinema from "./components/CinemaNotice/UpdateCinema";
import UpdateEvent from "./components/EventNotice/UpdateEvent";
import CinemaNoticeBoard from "./components/CinemaNotice/CinemaNoticeBoard";
import EventNoticeBoard from "./components/EventNotice/EventNoticeBoard";
import { IUser } from "./interfaces/user";
function App() {
  const [user, setUser] = useState<IUser | null>(null);
  const [isCinemaOwner, setIsCinemaOwner] = useState(false);

  async function fetchUser() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
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
        {/* NavBar Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login fetchUser={fetchUser} />} />

        <Route path="/cinemas" element={<CinemaList />} />
        <Route path="/cinemas-map" element={<CinemaMap />} />
        <Route path="/post-cinema" element={<PostCinema />} />

        {/*Routes from Cinema Notice Board */}
        <Route path="/edit-cinema/:cinemaId" element={<UpdateCinema />} />
        <Route
          path="/cinemas/:cinemaId"
          element={<CinemaNoticeBoard user={user} />}
        />
        <Route
          path="/events/:eventId"
          element={<EventNoticeBoard user={user} />}
        />
        <Route path="/cinemas/:cinemaId/post-event" element={<PostEvent />} />
        <Route path="/events/:eventId/update-event" element={<UpdateEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
