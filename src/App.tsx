import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import CinemaList from "./components/CinemaList";
import ShowCinema from "./components/ShowCinema";
import ShowEvent from "./components/ShowEvent";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<p>singup</p>} />
        <Route path="/login" element={<p>login</p>} />

        <Route path="/cinemas" element={<CinemaList />} />
        <Route path="/cinemas-map" element={<p>CinemaMap</p>} />

        <Route path="/post-cinema" element={<p>Upload Cinema</p>} />

        <Route path="/cinemas/:cinemaId" element={<ShowCinema />} />
        <Route path="/events/:eventId" element={<ShowEvent />} />
      </Routes>
    </Router>
  );
}

export default App;
