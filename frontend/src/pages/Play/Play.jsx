import React from "react";
import { Container } from "react-bootstrap";

import BannerPozo from "../../components/Play/BannerPozo";
import SorteoActual from "../../components/Play/SorteoActual";

import useContractInfo from "../../hooks/useContractInfo";

function Play() {
  const { contrato, pozo, currentDraw } = useContractInfo();

  return (
    <div>
      <Container fluid className="resume-section">
        {pozo && <BannerPozo pozo={pozo} className="me-2"/> }
        <SorteoActual  sorteoID={currentDraw}/>
      </Container>
    </div>
  );
}

export default Play;
