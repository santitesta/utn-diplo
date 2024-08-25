import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

//PAGINAS
import Home from "./pages/Home/Home";
import MemberShips from "./pages/MemberShips/MemberShips";
import History from "./pages/History/HistoryNew";
import Play from "./pages/Play/Play";
import Admin from "./pages/Admin/Admin";

//COMPONENTES
import Layout from "./components/Layout/Layout";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

//CSS
import "./styles/themes.css";
import "./styles/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="play" element={<Play />} />
          {/* <Route path="memberships" element={<MemberShips />} /> Funcionalidad FUTURA */} 
          <Route path="admin" element={<Admin />} />
          <Route path="history" element={<History />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
