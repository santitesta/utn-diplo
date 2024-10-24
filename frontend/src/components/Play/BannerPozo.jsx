import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import LotteryJackpot from "../LotteryJackpot/LotteryJackpot";

const BannerContainer = styled.div`
  background: linear-gradient(90deg, rgba(199, 112, 240, 1) 0%, rgba(27,20,41,1) 100%);
  padding: 20px 0;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  .circle-pattern {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    z-index: 1;
  }

  .content {
    position: relative;
    z-index: 2;
  }

  .lottery-logo {
    max-width: 100px;
    margin-left: auto;
    margin-right: auto;
  }

  .character {
    max-width: 150px;
    margin-left: auto;
    margin-right: auto;
  }

  .text-section {
    margin-top: 10px;
  }
`;

const BannerPozo = ({pozo}) => {
  return (
    <BannerContainer>
      <div className="circle-pattern"></div>
      <Container className="content">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6}>
            <LotteryJackpot pozo={pozo?parseFloat(pozo):0.00}/>
          </Col>
          <Col xs={12} md={6} className="text-section">
            <h1>QuiniBlock</h1>
            <p>LA LOTERIA DEL FUTURO</p>
          </Col>
        </Row>
      </Container>
    </BannerContainer>
  );
};

export default BannerPozo;
