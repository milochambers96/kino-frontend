import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<p>Home</p>} />
        <Route path="/signup" element={<p>singup</p>} />
        <Route path="/login" element={<p>login</p>} />

        <Route path="/cinemas" element={<p>CinemaList</p>} />
        <Route path="/cinemas-map" element={<p>CinemaMap</p>} />

        <Route path="/post-cinema" element={<p>Upload Cinema</p>} />

        <Route path="/cinemas/:cinemaId" element={<p>Show Cinema</p>} />
        <Route
          path="/cineams/:cinemaId/event/:eventId"
          element={<p>Show Event</p>}
        />
      </Routes>
    </Router>
  );
}

export default App;
