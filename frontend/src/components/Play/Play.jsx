import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import BannerPozo from "../BannerPozo";
import Botonera from "./Botonera";
<<<<<<< HEAD
import InformacionContrato from "./InformacionContrato";

import { Col, Row } from "react-bootstrap";

=======

>>>>>>> 48ecbb470cfef2b083e78a532ccd3e324272a275
function Play() {
  
  return (
    <div>
      <Container fluid className="resume-section">
        <BannerPozo />
<<<<<<< HEAD
        <Row aria-colspan={2}  className="m-2">
          <Col className="d-grid gap-2">
            <Botonera />
          </Col>
          <Col className="d-grid gap-2">
            <InformacionContrato />
          </Col>
      </Row>
=======
        <Botonera />
>>>>>>> 48ecbb470cfef2b083e78a532ccd3e324272a275
      </Container>
    </div>
  );
}

export default Play;
