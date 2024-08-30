import React,{useEffect,useState} from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import BannerPozo from "../../components/Play/BannerPozo";
import SorteoActual from "../../components/Play/SorteoActual";
import UltmoSorteo from "../../components/Play/UltmoSorteo";
import useContractInfo from "../../hooks/useContractInfo";
import { useAccount } from 'wagmi';



function Play() {
  const { isConnected, address } = useAccount();
  const { estadoContrato, owner, pozo, currentDraw } = useContractInfo();

  const alerta =(mensaje)=>{
    alert(`alerta de ${mensaje}`);
  }

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
