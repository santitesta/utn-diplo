import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';

function CardContrato({ contrato }) {
    const PrintInfo = (title, value) => {
        const controlId = `contrato.${title.replace(/\s+/g, '')}`; // Elimina todos los espacios en blanco
        return (
            <Form.Group className="mb-3"controlId={controlId}>
                <Form.Label>{title}:</Form.Label>
                <Form.Control type="text" className="text-center" disabled placeholder={title} value={value} />
            </Form.Group>
        );
    };

    return (
        <Card>
            <Card.Header className="bg-primary text-white">Contrato Resumen</Card.Header>
            <Form className="p-1">
                {PrintInfo("Owner", contrato?.owner)}
                <Row>
                    <Col xs={4} className="d-flex justify-content-center">
                        {PrintInfo("Balance", `${contrato?.balance} Eth`)}
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        {PrintInfo("Pozo Base", `${contrato?.basePot} Eth`)}
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        {PrintInfo("Precio de un ticket", `${contrato?.ticketPrice} Eth`)}
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} className="d-flex justify-content-center">
                        {PrintInfo("Contador de Ticket", contrato?.contadorTicket)}
                    </Col>
                    <Col xs={6} className="d-flex justify-content-center">
                        {PrintInfo("Contador de Sorteos", contrato?.contadorSorteos)}
                    </Col>

                </Row>
            </Form>
        </Card>
    );
}

// Definir PropTypes para la validación de los props
CardContrato.propTypes = {
    contrato: PropTypes.object.isRequired, // Asegura que title es una cadena y es requerido
};
export default CardContrato;
