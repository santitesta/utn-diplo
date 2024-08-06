import { useState,useEffect } from "react";
import { Col, Row, Button } from "react-bootstrap";
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';


function CardInfoSorteo({ sorteo }) {
    const [activo, setActivo] = useState(false); 
    const [anterior, setAnterior] = useState([]); 


    useEffect(()=>{
        const numero = sorteo.numero??-1;
        const anterior = sorteo.anterior??0;
        setAnterior(sorteo.anterior);
        const activo = (numero>anterior.numero);
        setActivo(activo);
    },[sorteo]) ;

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
            <Card.Header className="bg-primary text-white">Pozos</Card.Header>
            <Form className="p-1">
                <Row>
                    <Col xs={6} className="d-flex justify-content-center">
                        {PrintInfo("Actual", `${sorteo?.numero} Eth`)}
                    </Col>
                    <Col xs={6} className="d-flex justify-content-center">
                        <Form.Group className="mb-3" >
                            <Form.Label>Estado del Sorteo:</Form.Label>
                            <Form.Control 
                                type="text" 
                                className={`text-center ${activo ? 'bg-success text-white' : 'bg-danger text-white'}`} 
                                disabled 
                                placeholder="Estado del sorteo" 
                                value={activo ? 'Activo' : 'Finalizado'} 
                            />
                        </Form.Group>
                    </Col> 
               </Row>          
                <Row>
                <Form.Group className="mb-3"controlId={"sorteos"}>
                    <Form.Label>Ultimo Sorteo:</Form.Label>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Sorteo #</th>
                                    <th>Fecha</th>
                                    <th>Numeros Ganadores</th>
                                    <th>Address Ganadores</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{anterior.numero}</td>
                                    <td>{anterior.drawDate}</td>
                                    <td>{anterior.winningNumbers.join(', ')}</td>
                                    {/* falta verificar que si es nulo queda Vacante */}
                                    <td>{anterior.winners.join(', ')}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Form.Group>
                </Row>
            </Form>
        </Card>
    );
}

// Definir PropTypes para la validación de los props
CardInfoSorteo.propTypes = {
    sorteo: PropTypes.object.isRequired, // Asegura que title es una cadena y es requerido
};
export default CardInfoSorteo;
