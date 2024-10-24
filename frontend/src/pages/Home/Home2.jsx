import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../assets/images/avatar.svg";
import Tilt from "react-parallax-tilt";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              DESCUBRE LA <span className="purple">LOTERIA DEL FUTURO  </span>
            </h1>
            <p className="home-about-body">
              Bienvenido a nuestra innovadora quiniela blockchain, donde la transparencia y la seguridad son nuestras prioridades.
              <br />
              <br />Nuestra plataforma está diseñada con la última tecnología en
              <i>
                <b className="purple"> Blockchain </b>
              </i>
              para garantizar sorteos justos y protección de datos.
              <br />
              <br />
              Nuestro objetivo es ofrecerte una experiencia de juego 
              <i>
                <b className="purple"> Confiable y Eficiente, </b>
              </i>
              utilizando los beneficios de la tecnología descentralizada.
              <br />
              <br />
              Únete a nosotros y descubre cómo la tecnología blockchain puede transformar 
              <b className="purple"> tu manera de jugar. </b>
              <br />
              <br />
              Explora nuestra plataforma y participa en una quiniela
              <i>
                <b className="purple"> Segura, Transparente </b>
              </i>
              y con oportunidades únicas para ganar grandes premios.
            </p>
          </Col>

          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
       
      </Container>
    </Container>
  );
}
export default Home2;
