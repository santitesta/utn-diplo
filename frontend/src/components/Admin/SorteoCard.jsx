import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form } from "react-bootstrap";
import NumberInput from '../../components/NumberInput/NumberInput';
import { AiOutlineCaretRight, AiOutlinePause } from "react-icons/ai";
import PersonalizedDialog from '../PersonalizedDialog/PersonalizedDialog';
import { useInicializarSorteo, useFinalizarSorteo } from '../../services/contractService';

function SorteoCard({ estadoContrato, isConnected }) {
  const [isSorteoActivo, setIsSorteoActivo] = useState(false);
  const [sorteoShow, setSorteoShow ] = useState(false);
  const [sorteoIniciado, setSorteoIniciado] = useState(false);
  const count = 6;
  const [numerosGanadores, setNumerosGanadores] = useState(Array(count).fill(null));
  const [validityState, setValidityState] = useState(Array(count).fill(true));

  const { inicializarSorteo, wcInicializarSorteo, wfInicializarSorteo } = useInicializarSorteo();
  const { finalizarSorteo, wcFinalizarSorteo, wfFinalizarSorteo } = useFinalizarSorteo();

  const [newSorteId, setNewSorteId] = useState(null);

  useEffect(() => {
    if (estadoContrato) {
      const { contrato } = estadoContrato;
      const estado = contrato?.isDrawActive ? contrato.isDrawActive : false;
      setIsSorteoActivo(estado);
    }
  }, [estadoContrato]);

  useEffect(() => {
    if (wfInicializarSorteo.isSuccess && !sorteoIniciado) {
      console.log(`Inicio de Sorteo Exitoso.`);
      setSorteoShow(false);
      alert(`Inicio de Sorteo Exitoso.`);
      setSorteoIniciado(true);
    }
  }, [wfInicializarSorteo, sorteoIniciado]);

  useEffect(() => {
    const array_nulo = Array(count).fill(null);
    const sumaTotal = numerosGanadores
      .flat()
      .reduce((acc, num) => acc + num, 0);

    if (wfFinalizarSorteo.isSuccess && sumaTotal > 0) {
      alert(`Se finalizó el sorteo. Ganadores números: [${numerosGanadores}]. Me falta generar el historial.`);
      setNumerosGanadores(array_nulo);
      setSorteoShow(false);
      setSorteoIniciado(false);
    }
  }, [wfFinalizarSorteo]);

  const handleInputChange = (index, value) => {
    const newNumeros = [...numerosGanadores];
    newNumeros[index] = value;
    setNumerosGanadores(newNumeros);
  };

  const validateNumbers = () => {
    let allValid = true;
    const newValidity = [...validityState];
    const seenNumbers = new Set();

    for (let i = 0; i < count; i++) {
      const value = numerosGanadores[i];
      if (isNaN(value) || value < 0 || value > 45 || value === "" || value === null) {
        newValidity[i] = false;
        allValid = false;
      } else if (seenNumbers.has(value)) {
        newValidity[i] = false;
        allValid = false;
      } else {
        newValidity[i] = true;
        seenNumbers.add(value);
      }
    }

    setValidityState(newValidity);
    return allValid;
  };

  const handleIniciarSorteo = () => {
    if (isConnected) {
      console.log(`Inicializando`);
      inicializarSorteo(`${window.CONTRACT_ADDRESS}`,setNewSorteId);
    } else {
      console.log(`Debe iniciar sesión para inicializar un Sorteo.`);
    }
  };

  const handleFinalizoSorteo = () => {
    if (validateNumbers()) {
      console.log(`Se finalizó el sorteo. Ganadores números: [${numerosGanadores}]`);
      let numerosOrdenados = [...numerosGanadores].sort((a, b) => a - b);
      if (isConnected) {
        finalizarSorteo(`${window.CONTRACT_ADDRESS}`, numerosOrdenados);        
      } else {
        console.log("Sin conexión.");
      }
    } else {
      console.log("Uno o más números son inválidos.");
    }
  };

  return (
    <Card className='container-card' text='white'>
      <Card.Header as="h4" className="d-flex justify-content-between align-items-center">
        <span>Sorteo</span>
        <PersonalizedDialog
          title={isSorteoActivo ? 'Finalizar Sorteo' : 'Iniciar Sorteo'}
          primaryAction={isSorteoActivo ? handleFinalizoSorteo : handleIniciarSorteo}
          secondaryAction={() => setSorteoShow(false)}
          handleClose={() => setSorteoShow(false)}
          handleShow={() => setSorteoShow(true)}
          primaryLabel={isSorteoActivo ? 'Finalizar' : 'Iniciar'}
          secondaryLabel="Cancel"
          showDialog={sorteoShow}
          isLoading={isSorteoActivo ? (wfFinalizarSorteo?.isConfirming || wcFinalizarSorteo?.isPending) : (wfInicializarSorteo?.isConfirming || wcInicializarSorteo?.isPending)}
          buttonIcon={isSorteoActivo ? AiOutlinePause : AiOutlineCaretRight}
        >
          {isSorteoActivo ? (
            <>
              <p>Hay un sorteo en curso. Ingrese los números ganadores</p>
              <Row>
                {[...Array(count)].map((_, index) => (
                  <Col xs sm="6" md="2" className="d-flex justify-content-center p-1" key={index}>
                     <NumberInput
                        placeholder={`#${index + 1}`}
                        value={numerosGanadores[index] || ''}
                        onChange={(value) =>handleInputChange(index,value)}
                        className={` ${!validityState[index] ? 'is-invalid' : ''}`}
                        />
                  </Col>
                ))}
              </Row>
            </>
          ) : (
            <>
              <p>No hay sorteos en curso</p>
              <p>¿Desea iniciar un sorteo?</p>
            </>
          )}
        </PersonalizedDialog>
      </Card.Header>
      <Card.Body>
          <p>Estado: {isSorteoActivo ? <span className="bg-success text-white p-2">Iniciado</span> : <span className="bg-danger text-white p-2">Finalizado</span>}</p>
          <p>Último sorteo {estadoContrato?.sorteo.anterior.winners?.length > 0 ? `${estadoContrato.sorteo.anterior.winners.length} ganadores` : 'VACANTE'}</p>
          <p>Fecha del sorteo {estadoContrato?.sorteo.anterior.drawDate?.substring(0, 10)}</p>
      </Card.Body>
    </Card>
  );
}

export default SorteoCard;
