import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useAccount } from 'wagmi';
// HOOKS
import useContractInfo from "../../hooks/useContractInfo";
//COMPONENTES
import LotteryChart from '../../components/Admin/LotteryChart';
import SorteoCard from '../../components/Admin/SorteoCard'; 
import PozosCard from '../../components/Admin/PozosCard';  
import ContratoCard from '../../components/Admin/ContratoCard';  
import EstadoCard from '../../components/Admin/EstadoCard';  

function Admin() {
  const { isConnected,address } = useAccount();
  const { estadoContrato,owner } = useContractInfo();

  const isOwner= address==owner;

  
  
  return (
    <>
      <Container fluid className="resume-section">
        {!isOwner &&<div className="bg-danger"> NO ES OWNER </div>}
        <Row className="m-2">
          <Row>
            {/* <Col className="col-xl-5 col-lg-6"> */}
              <Row>
                <Col className="col-sm-6">
                    <SorteoCard 
                      estadoContrato={estadoContrato} 
                      isConnected={isConnected} 
                    /> 
                </Col>
                <Col className="col-sm-6">
                    <PozosCard
                      estadoContrato={estadoContrato}
                      isConnected={isConnected}
                    />
                </Col>
                <Col className="col-sm-6">
                    <ContratoCard 
                      estadoContrato={estadoContrato} 
                      isPaused={false} 
                    /> 
                </Col>
                <Col className="col-sm-6">
                    <EstadoCard
                      estadoContrato={estadoContrato}
                      isConnected={isConnected}
                    />
                </Col>
              </Row>

            {/* </Col> */}
            {/* <Col className="col-xl-7 col-lg-6">
              <LotteryChart />
            </Col> */}
          </Row>
        </Row>
      </Container>
    </>
  );
}

export default Admin;

