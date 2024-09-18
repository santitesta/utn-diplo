import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form,Button } from "react-bootstrap";
import NumberInput from '../../components/NumberInput/NumberInput';
import PersonalizedDialog from '../PersonalizedDialog/PersonalizedDialog';
import {AiFillTool, AiOutlineCaretRight, AiOutlinePause } from "react-icons/ai";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function ContratoCard({ estadoContrato, isPaused }) {
    const [isContratoDialogActivo, setIsContratoDialogActivo] = useState(false);
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
      const alerta =(mensaje)=>{
    alert(`alerta de ${mensaje}`);
  }

    return (
        <Card className='container-card'  text='white'>
            <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
            <span>Contrato</span>
            <ButtonGroup>
                {isPaused?
                    <Button variant="dark" size="sm" className="p-2" onClick={()=>alerta("play")}>
                        <AiOutlineCaretRight />
                    </Button>   
                :
                    <Button variant="dark" size="sm" className="p-2" onClick={()=>alerta("pause")}>
                        <AiOutlinePause />
                    </Button>  
            
                }
                     
                <Button variant="dark" size="sm" className="p-2" onClick={()=>setIsContratoDialogActivo(true)}>
                    <AiFillTool />
                </Button>      
            </ButtonGroup>

            <PersonalizedDialog
                title="Actualizar Pozo Base"
                primaryAction={handleSavePrecio}
                secondaryAction={handleCancel}
                primaryLabel="Actualizar"
                secondaryLabel="Cancel"
                isLoading={false}
                showDialog={isContratoDialogActivo}
                handleClose= {()=>setIsContratoDialogActivo(false)}
                handleShow= {()=>setIsContratoDialogActivo(true)}
                >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Pozo Base [{window.SYMBOL}]:</Form.Label>
                    <NumberInput
                    placeholder="Precio del pozo base"
                    value={precio}
                    onChange={setPrecio}
                    />
                </Form.Group>
                </PersonalizedDialog>
            </Card.Header>
            <Card.Body>
                <p>Estado : <span className="bg-success text-white p-2">Runing</span> </p>
                <p>Balance: {estadoContrato?.contrato.balance} {window.SYMBOL}</p>
                <p>Pozo Base: {estadoContrato?.contrato.basePot} {window.SYMBOL}</p>
            </Card.Body>
        </Card>
    )
}

export default ContratoCard;
