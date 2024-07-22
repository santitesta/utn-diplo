import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import BannerPozo from "../BannerPozo";

function Play() {

  return (
    <div>
      <Container fluid className="resume-section">
        <BannerPozo />
      </Container>
    </div>
  );
}

export default Play;
