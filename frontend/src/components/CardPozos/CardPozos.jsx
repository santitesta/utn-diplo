import { useState } from "react";
import { Col, Row, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';



function CardPozos({ pozos }) {
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
            <Card.Header className="bg-primary text-white">Pozos para proximo Sorteos</Card.Header>
            <Form className="p-1">
                <Row>
                    <Col xs={4} className="d-flex justify-content-center">
                        {PrintInfo("Primario", `${pozos?.primario} Eth`)}
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        {PrintInfo("Secundario", `${pozos?.secundario} Eth`)}
                    </Col>
                    <Col xs={4} className="d-flex justify-content-center">
                        {PrintInfo("Reserva", `${pozos?.reserva} Eth`)}
                    </Col>
                </Row>                
            </Form>
        </Card>
    );
}

// Definir PropTypes para la validación de los props
CardPozos.propTypes = {
    pozos: PropTypes.object.isRequired, // Asegura que title es una cadena y es requerido
};
export default CardPozos;
