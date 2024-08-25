import React from 'react';
import { Col, Row, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import NumberInput from '../NumberInput/NumberInput'; 
import CardWaitForTx from '../CardWaitForTx/CardWaitForTx'; // Importa el nuevo componente

function CardSorteo({ title, buttonText,buttonText2, pozoPrimario, setPozoPrimario, pozoSec, setPozoSec, reservePot, setReservePot, handleSubmit,handleSubmit2,  hash, error,isPending ,isConfirming, isConfirmed }) {
    return (
        <CardWaitForTx hash={hash} error={error} title={title} isPending={isPending} isConfirmed = {isConfirmed}>
            <Form className="p-1"  onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="setPot">
                    <Form.Label>Ajustar pozos</Form.Label>
                    <Row className="mb-3">
                        <Col xs={4} className="d-flex justify-content-center">
                            <NumberInput
                                placeholder="Primario"
                                value={pozoPrimario}
                                onChange={setPozoPrimario}
                            />
                        </Col>
                        <Col xs={4} className="d-flex justify-content-center">
                            <NumberInput
                                placeholder="Secundario"
                                value={pozoSec}
                                onChange={setPozoSec}
                            />
                        </Col>
                        <Col xs={4} className="d-flex justify-content-center">
                            <NumberInput
                                placeholder="Reserva"
                                value={reservePot}
                                onChange={setReservePot}
                            />
                        </Col>
                    </Row>
                    <Button variant="outline-primary" type="submit" disabled={(isConfirming || isPending)?true:false}>{buttonText}</Button>
                    
                </Form.Group>
            </Form>
            <hr/>
            <Form className="p-1" onSubmit={handleSubmit2}>
                <Form.Group className="mb-3" controlId="starDraw">
                    <Button variant="outline-danger" type="submit"  disabled={(isConfirming || isPending)?true:false}>{buttonText2}</Button>
                </Form.Group>
            </Form>
        </CardWaitForTx>
    );
}

CardSorteo.propTypes = {
    title: PropTypes.string.isRequired,
    buttonText: PropTypes.string.isRequired,
    buttonText2: PropTypes.string.isRequired,
    pozoPrimario:  PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null])
    ]),
    pozoSec: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null])
    ]),
    reservePot:  PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.oneOf([null])
    ]),
    setPozoPrimario: PropTypes.func.isRequired,
    setPozoSec: PropTypes.func.isRequired,
    setReservePot: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    isPending : PropTypes.bool,
    isConfirming: PropTypes.bool,
    isConfirmed: PropTypes.bool,
    hash: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null])
    ]),
    error: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([null])
    ]),
};

export default CardSorteo;