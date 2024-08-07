import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";

import BannerPozo from "../BannerPozo";
import Botonera from "./Botonera";
import InformacionContrato from "./InformacionContrato";

import { Col, Row } from "react-bootstrap";

function Play() {

  return (
    <div>
      <Container fluid className="resume-section">
        <BannerPozo />
        <Row aria-colspan={2}  className="m-2">
          <Col className="d-grid gap-2">
            <Botonera />
          </Col>
          <Col className="d-grid gap-2">
            <InformacionContrato />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Play;
