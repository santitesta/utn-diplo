import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  let date = new Date();
  let year = date.getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Desarrollado por The FiveBlocks!</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} FB!</h3>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
