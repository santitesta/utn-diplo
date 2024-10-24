import React from 'react';
import { Col, Row, Card } from "react-bootstrap";
import BingoBall from './BingoBall';

export default function UltimoSorteo({ sorteo }) {

  //console.log(console.log(JSON.stringify(sorteo, null, 3)));
  const cantidadGanadores = sorteo?sorteo.winners.length:0;


  return (
    <Row>
      <Col className="d-grid gap-2">
        <Card className='container-card' text='white'>
          <Card.Header as="h4">Resultados de la Ultima Jugada</Card.Header>
          <Card.Body>
            <h6>Sorteo Numero: {sorteo?sorteo.numero:0}</h6>
            <h6>Fecha Sorteada: {sorteo?sorteo.drawDate:''}</h6>

            <Row className='pt-2'>
              {sorteo&&sorteo.winningNumbers.map((num, index) => (
                <BingoBall key={index} number={num} />
              ))}
            </Row>
            
            <Row className='pt-2'>
                {cantidadGanadores === 0 ? (
                    <h5>Pozo Vacante!</h5>
                ) : (
                    <h5>Hubo {cantidadGanadores} Ganador{cantidadGanadores > 1 ? 'es' : ''}!</h5>
                )}                
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
