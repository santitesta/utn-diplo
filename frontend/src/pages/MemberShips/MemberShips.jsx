import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import MemberShipsCard from "./MemberShipsCards";
import ticketOro from "../../assets/tickets/oro.webp";
import ticketPlata from "../../assets/tickets/plata.webp";
import ticketEstandar from "../../assets/tickets/estandar.webp";



function MemberShips() {
  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
           <strong className="purple">Membresias </strong>
        </h1>
        <p style={{ color: "white" }}>
          Aqui puedes adquirir tus membresias anuales de juego.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <MemberShipsCard
              imgPath={ticketEstandar}
              title="Estandar"
              description="Permite comprar 1 ticket semanal, te garantizas 52 tickets anuales"
              price="24.96 USD"
            />
          </Col>

          <Col md={4} className="project-card">
            <MemberShipsCard
              imgPath={ticketPlata}
              title="Plata"
              description="Permite comprar 2 tickets semanales, te garantizas 104 tickets anuales"
              price="46.80 USD"
            />
          </Col>

          <Col md={4} className="project-card">
            <MemberShipsCard
              imgPath={ticketOro}
              title="Oro"
              description="Permite comprar 4 tickets semanales, te garantizas 208 tickets anuales"
              price="83.20 USD"            
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default MemberShips;
