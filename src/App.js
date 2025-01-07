import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import About from "./pages/AboutPage";
import Asyk from "./pages/AsykGamePage";
import MainPage from "./pages/MainPage";
import PaintPage from "./pages/PaintPage";
import Puzzle from "./pages/PuzzlePage";
import Puzzles from "./pages/PuzzlesPage";
import Text from "./pages/TextPage";
import Texts from "./pages/TextsPage";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/puzzles" element={<Puzzles />} />
          <Route path="/puzzles/:id" element={<Puzzle />} />
          <Route path="/asyk-oiyny" element={<Asyk />} />

          <Route path="/texts" element={<Texts />} />
          <Route path="/paint" element={<PaintPage />} />
          <Route path="/about" element={<About />} />

          <Route path="/texts/:id" element={<Text />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
