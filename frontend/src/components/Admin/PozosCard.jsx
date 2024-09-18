import React, { useState, useEffect } from 'react';
import {Card,Form,Row,Col} from 'react-bootstrap';
import NumberInput from '../../components/NumberInput/NumberInput';
import PersonalizedDialog from '../../components/PersonalizedDialog/PersonalizedDialog';
import { AiFillTool } from 'react-icons/ai';
import { useSetearPozos } from '../../services/contractService';

function PozosCard({ estadoContrato, isConnected }) {
  const { setearPozos, wcSetearPozos, wfSetearPozos } = useSetearPozos();
  const [isPozoModalActivo, setIsPozoModalActivo] = useState(false);
  const [pozos, setPozos] = useState(Array(3).fill(0));
  const [isFirstPozos, setIsFirstPozos] = useState(true);

  useEffect(() => {
    if (estadoContrato && isFirstPozos) {
      const varpozo = estadoContrato?.pozo;
      setPozos([
        parseFloat(varpozo.primario),
        parseFloat(varpozo.secundario),
        parseFloat(varpozo.reserva),
      ]);
      setIsFirstPozos(false);
    }
  }, [estadoContrato, isFirstPozos]);

  const handleSavePozos = () => {
    if (isConnected) {
      setearPozos(`${window.CONTRACT_ADDRESS}`, pozos[0], pozos[1], pozos[2]);
    } else {
      console.log('Debe iniciar sesión para cambiar Pozos.');
    }
  };

  useEffect(() => {
    if (wfSetearPozos.isSuccess && isPozoModalActivo) {
      console.log(`Pozos Actualizado. Pozo Primario[${pozos[0]}]  Pozo Secundario[${pozos[1]}] Pozo Reserva[${pozos[2]}]`);
      alert(`Pozos Actualizado. Pozo Primario[${pozos[0]}]  Pozo Secundario[${pozos[1]}] Pozo Reserva[${pozos[2]}]`);
      setIsPozoModalActivo(false);
    }
  }, [wfSetearPozos, pozos]);

  return (
    <Card className='container-card' text='white'>
      <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
        <span>Pozos</span>
        <PersonalizedDialog
          title="Ajustar Pozos"
          primaryAction={handleSavePozos}
          secondaryAction={() => setIsPozoModalActivo(false)}
          primaryLabel="Actualizar"
          secondaryLabel="Cancelar"
          isLoading={wfSetearPozos?.isConfirming || wcSetearPozos?.isPending}
          showDialog={isPozoModalActivo}
          handleClose={() => setIsPozoModalActivo(false)}
          handleShow={() => setIsPozoModalActivo(true)}
          buttonIcon={AiFillTool}
        >
          <Form.Group className="mb-3" controlId="formBasicPrimario">
            <Form.Label>Pozo Primario [{window.SYMBOL}]:</Form.Label>
            <NumberInput
              placeholder="Pozo Primario"
              value={pozos[0]}
              onChange={(value) => setPozos(pozos.map((pozo, index) => index === 0 ? value : pozo))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSecundario">
            <Form.Label>Pozo Secundario [{window.SYMBOL}]:</Form.Label>
            <NumberInput
              placeholder="Pozo Secundario"
              value={pozos[1]}
              onChange={(value) => setPozos(pozos.map((pozo, index) => index === 1 ? value : pozo))}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicReserva">
            <Form.Label>Pozo Reserva [{window.SYMBOL}]:</Form.Label>
            <NumberInput
              placeholder="Pozo Reserva"
              value={pozos[2]}
              onChange={(value) => setPozos(pozos.map((pozo, index) => index === 2 ? value : pozo))}
            />
          </Form.Group>
          <br />
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicBalance">
                <Form.Label>Balance del Contrato [{window.SYMBOL}]:</Form.Label> 
                <Form.Control
                  type="text"
                  placeholder="Balance del contrato"
                  value={estadoContrato?.contrato.balance}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="formBasicSuma">
                <Form.Label>Suma Seteada [{window.SYMBOL}]:</Form.Label> 
                <Form.Control
                  type="text"
                  placeholder="Suma Seteada"
                  value={pozos.reduce((partialSum, a) => partialSum + a, 0)}
                  disabled
                  readOnly
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="bg-danger">Lo ideal es que el balance sea igual a la suma.</div>
        </PersonalizedDialog>          
      </Card.Header>
      <Card.Body>
        <p>Primario: {estadoContrato?.pozo.primario} {window.SYMBOL}</p>
        <p>Secundario: {estadoContrato?.pozo.secundario} {window.SYMBOL}</p>
        <p>Reserva: {estadoContrato?.pozo.reserva} {window.SYMBOL}</p>
      </Card.Body>
    </Card>
  );
}

export default PozosCard;
