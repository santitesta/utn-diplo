import React, { useState, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import axios from 'axios';

import BannerPozo from "../../components/BannerPozo";
import Botonera from "./Botonera";
import InformacionContrato from "./InformacionContrato";

function Play() {
  const [estadoContrato, setEstadoContrato] = useState(null); 
  const [owner, setOwner] = useState(null); 
  const [pozo, setPozo] = useState(null); 

  useEffect(() => {
    // Llama a requestInformation inmediatamente al cargar el componente
    requestInformation();

    // Configura el intervalo para llamar a requestInformation cada minuto
    const intervalId = setInterval(() => {
      requestInformation();
    }, 60000); // 60000 ms = 1 minuto /10000 ms =10s

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(intervalId);
  }, []);

  const requestInformation = () => {
    const baseURL = `${window.URL_BACKEND}/estadoContratoStatico`;//estadoContratoStatico
    axios.get(baseURL, {
        headers: {
            'Content-Type': 'application/json', 
        },
    }).then((response) => {
        const data = response.data;
        setEstadoContrato(data);
        //console.log(`setEstadoContrato: ${JSON.stringify(data)}`);
        setOwner(data.contrato.owner);
        if(data.pozo.primario != pozo)
          setPozo(data.pozo.primario);
        //console.log(`pozo: ${data.pozo.primario}`);


    }).catch((error) => {
        console.error(error);
        alert('Fallo la solicitud de datos: ' + error);
    });
  };

  return (
    <div>
      <Container fluid className="resume-section">
        { pozo && <BannerPozo pozo={pozo} /> }
        <Row className="m-2">
          <Col className="d-grid gap-2">
            {owner && <Botonera owner={owner}/>}
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

export default Play;
