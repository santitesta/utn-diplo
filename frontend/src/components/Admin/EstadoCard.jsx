import React, { useState, useEffect } from "react";
import { Card, Form } from "react-bootstrap";
import NumberInput from '../../components/NumberInput/NumberInput';
import PersonalizedDialog from '../PersonalizedDialog/PersonalizedDialog';
import {AiFillTool } from "react-icons/ai";

function EstadoCard({ estadoContrato, isConnected }) {
  const [isEstadoActivo, setIsEstadoActivo] = useState(false);
  const [precio, setPrecio] = useState(0);
  const [isFirstPrecio, setIsFirstPrecio] = useState(true);

  useEffect(() => {
      //console.log(estadoContrato);
      if(isFirstPrecio){
          setPrecio(estadoContrato?.contrato.ticketPrice)
          setIsFirstPrecio(false);
      }
  }, [estadoContrato,isFirstPrecio]);

  const handleSavePrecio = () => {
      console.log(`Precio Actualizado ${precio} ${window.SYMBOL}`);
    };

  const handleCancel = () => {
    console.log('Action canceled');
  };

  return (
    <Card className='container-card'  text='white'>
      <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
        <span>Estado </span>
        <PersonalizedDialog
          title="Actualizar Precio del ticket"
          primaryAction={handleSavePrecio}
          secondaryAction={handleCancel}
          primaryLabel="Actualizar"
          secondaryLabel="Cancel"
          isLoading={false}
          showDialog={isEstadoActivo}
          handleClose= {()=>setIsEstadoActivo(false)}
          handleShow= {()=>setIsEstadoActivo(true)}
          buttonIcon = {AiFillTool}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nuevo Precio [{window.SYMBOL}]:</Form.Label>
            <NumberInput
              placeholder="Precio Del Ticket"
              value={precio}
              onChange={setPrecio}
            />
           </Form.Group>
            
        </PersonalizedDialog>
      </Card.Header>
      <Card.Body>
          <p>Tickets Vendidos: {estadoContrato?.contrato.contadorTicket}</p>
          <p>Ticket Precio: {estadoContrato?.contrato.ticketPrice} {window.SYMBOL}</p>
          <p>Numeros de sorteos: {estadoContrato?.sorteo.numero}</p>
      </Card.Body>
    </Card>
  )
}
export default EstadoCard;
