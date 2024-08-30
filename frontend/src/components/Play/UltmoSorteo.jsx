import React from 'react';
import { Col, Row, Card } from "react-bootstrap";
import BingoBall from './BingoBall';

export default function UltimoSorteo({ sorteo }) {

  console.log(sorteo)
  const cantidadGanadores = sorteo.winners.length;


  return (
    <Row>
      <Col className="d-grid gap-2">
        <Card className='container-card' text='white'>
          <Card.Header as="h4">Resultados de la Ultima Jugada</Card.Header>
          <Card.Body>
            <h6>Sorteo Numero: {sorteo.numero}</h6>
            <h6>Fecha Sorteada: {sorteo.drawDate}</h6>

            <Row className='pt-2'>
              {sorteo.winningNumbers.map((num, index) => (
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
