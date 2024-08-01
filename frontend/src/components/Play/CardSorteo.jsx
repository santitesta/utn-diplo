import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function CardTicket({  title, buttonText, pozoPrimario, setPozoPrimario, pozoSec, setPozoSec,handleButton}) {

    const handleSubmit = (e) => {
        e.preventDefault();
        handleButton();
    };

    return (
        <Card>
            <Card.Header>{title}</Card.Header>
            <Form className="p-1" onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="starDraw">
                    <Form.Label>Pozos</Form.Label>
                    <Row>
                            <Col xs={6} className="d-flex justify-content-center">
                                <Form.Control
                                    type="text"
                                    placeholder={`Primario`}
                                    value={pozoPrimario} // Muestra el valor actual
                                    onChange={(e) => setPozoPrimario(parseInt(e.target.value, 10))}
                                    className={`text-center`}
                                />
                            </Col>
                            <Col xs={6} className="d-flex justify-content-center">
                                <Form.Control
                                    type="text"
                                    placeholder={`Secundario`}
                                    value={pozoSec} // Muestra el valor actual
                                    onChange={(e) => setPozoSec(parseInt(e.target.value, 10))}// Actualiza el estado de numeros
                                    className={`text-center`}
                                />
                            </Col>
                    </Row>
                </Form.Group>
                <Button variant="outline-danger" type="submit">{buttonText}</Button>
            </Form>
        </Card>
    );
}

// Definir PropTypes para la validación de los props
CardTicket.propTypes = {
    title: PropTypes.string.isRequired, // Asegura que title es una cadena y es requerido
    buttonText: PropTypes.string.isRequired, // Asegura que title es una cadena y es requerido
    pozoPrimario: PropTypes.number.isRequired, // 
    pozoSec: PropTypes.number.isRequired, // 
    setPozoPrimario: PropTypes.func.isRequired, // Asegura que handleButton es una función y es requerido
    setPozoSec: PropTypes.func.isRequired, // Asegura que setNumeros es una función y es requerido
    handleButton: PropTypes.func.isRequired, // Asegura que handleButton es una función y es requerido
};
export default CardTicket;
