import React from "react";
import { Container, Col, Row } from "react-bootstrap";

import BannerPozo from "../../components/Admin/BannerPozo";
import Botonera from "../../components/Admin/Botonera";
import InformacionContrato from "../../components/Admin/InformacionContrato";

import useContractInfo from "../../hooks/useContractInfo";

function Admin() {
  const { estadoContrato, owner, pozo, currentDraw } = useContractInfo();

  return (
    <div>
      <Container fluid className="resume-section">
        {/* { pozo && <BannerPozo pozo={pozo} /> } */}
        <Row className="m-2">
          <Col className="d-grid gap-2">
            {owner && <Botonera owner={owner} sorteoID={currentDraw}/>}
          </Col>
          <Col className="d-grid gap-2">
            {estadoContrato ? (
              <InformacionContrato estadoContrato={estadoContrato} />
            ) : (
              <p>Cargando información del contrato...</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Admin;
