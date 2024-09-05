import React from "react";
import { Container} from "react-bootstrap";
import BannerPozo from "../../components/Play/BannerPozo";
import SorteoActual from "../../components/Play/SorteoActual";
import UltmoSorteo from "../../components/Play/UltmoSorteo";
import useContractInfo from "../../hooks/useContractInfo";

function Play() {
  const { estadoContrato,  pozo, currentDraw } = useContractInfo();
  return (
    <div>
      <Container fluid className="resume-section">
        {pozo && <BannerPozo pozo={pozo} className="me-2"/> }
        {estadoContrato && <UltmoSorteo sorteo={estadoContrato.sorteo.anterior} />}
        <SorteoActual  sorteoID={currentDraw}/>
      </Container>
    </div>
  );
}

export default Play;
