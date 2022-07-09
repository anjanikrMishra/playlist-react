import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddSong from "./components/AddSong";
import AddPlayList from "./components/AddPlayList";
import DashBoard from "./components/DashBoard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/addSong" element={<AddSong />} />
        <Route path="/addPlaylist" element={<AddPlayList />} />
      </Routes>
    </Router>
  );
}

export default App;
