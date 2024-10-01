import React from "react";
import { Container} from "react-bootstrap";
import BannerPozo from "../../components/Play/BannerPozo";
import SorteoActual from "../../components/Play/SorteoActual";
import UltmoSorteo from "../../components/Play/UltmoSorteo";
import useContractInfo from "../../hooks/useContractInfo";

function Play() {
  const { estadoContrato,  pozo, currentDraw } = useContractInfo();
  const sorteAnterior= estadoContrato?estadoContrato.sorteo.anterior:null;
  return (
    <div>
      <Container fluid className="resume-section">
        <BannerPozo pozo={pozo} className="me-2"/>
        <UltmoSorteo sorteo={sorteAnterior} />
        <SorteoActual  sorteoID={currentDraw} estadoContrato={estadoContrato}/>
      </Container>
    </div>
  );
}

export default Play;
