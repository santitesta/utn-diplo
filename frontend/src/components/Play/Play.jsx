import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import BannerPozo from "../BannerPozo";
import Botonera from "./Botonera";

function Play() {
  
  return (
    <div>
      <Container fluid className="resume-section">
        <BannerPozo />
        <Botonera />
      </Container>
    </div>
  );
}

export default Play;
