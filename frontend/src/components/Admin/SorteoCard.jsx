import React, { useState, useEffect } from "react";
import { Card, Row, Col, Form, Button } from "react-bootstrap";
import NumberInput from '../../components/NumberInput/NumberInput';
import { AiOutlineCaretRight, AiOutlinePause } from "react-icons/ai";
import PersonalizedDialog from '../PersonalizedDialog/PersonalizedDialog';
import axios from 'axios';

import { useInicializarSorteo } from '../../services/iniciarSorteoService';
import { useFinalizarSorteo } from '../../services/finalizarSorteoService';

function SorteoCard({ estadoContrato, isConnected }) {
  const [isSorteoActivo, setIsSorteoActivo] = useState(false);
  const [sorteoShow, setSorteoShow ] = useState(false);
  const [sorteoIniciado, setSorteoIniciado] = useState(false);
  const count = 6;
  const [numerosGanadores, setNumerosGanadores] = useState(Array(count).fill(null));
  const [validityState, setValidityState] = useState(Array(count).fill(true));

  const { inicializarSorteo, returnedSorteoID:newSorteoId, isSuccess:iisSuccess, isPending:iisPending, hash:ihash,isError:iisError, errorMessage:ierrorMessage } = useInicializarSorteo();
  const { finalizarSorteo, returnedWinners:winnersAddress, isSuccess:fisSuccess, isPending:fisPending, hash:fhash,isError:fisError, errorMessage:ferrorMessage } = useFinalizarSorteo();

  useEffect(() => {
    if (estadoContrato) {
      const { contrato } = estadoContrato;
      const estado = contrato?.isDrawActive ? contrato.isDrawActive : false;
      setIsSorteoActivo(estado);
    }
  }, [estadoContrato]);

  useEffect(() => {
    if(fisError)
      console.log(ferrorMessage)
  }, [fisError]);
  useEffect(() => {
    const array_nulo = Array(count).fill(null);
    if (iisSuccess && !sorteoIniciado && newSorteoId>0) {
      console.log(`Inicio de Sorteo Exitoso.`);
      setSorteoShow(false);
      alert(`Inicio de Sorteo Exitoso. Sorteo Numero: ${newSorteoId}`);
      axios.post(`${window.URL_BACKEND}/sorteos/iniciar`, {
        drawId: newSorteoId,
      }).then(response => {
        setNumerosGanadores(array_nulo);
        setSorteoIniciado(true);  
      })
      .catch(error => {
        // Manejar el error en caso de fallo
        console.error('Error al iniciar el sorteo:', error);
      });
      
    }
  }, [iisSuccess, sorteoIniciado,newSorteoId]);

  useEffect(() => {
    const array_nulo = Array(count).fill(null);
    const sumaTotal = numerosGanadores
      .flat()
      .reduce((acc, num) => acc + num, 0);

    if (fisSuccess && sumaTotal > 0 && winnersAddress) {
      alert(`Se finalizó el sorteo. Ganadores números: [${numerosGanadores}]. hubo [${winnersAddress.length}] ganadores`);
      let numerosOrdenados = [...numerosGanadores].sort((a, b) => a - b);
      console.log('winnersAddress',winnersAddress);
      axios.put(`${window.URL_BACKEND}/sorteos/finalizar`, {
        drawId: estadoContrato.sorteo.numero, 
        numerosGanadores: numerosOrdenados,
        pozoSorteado: estadoContrato.pozo.primario,
        cantGanadores: winnersAddress.length,
        ganadores: winnersAddress,
        maxNroTicket: (estadoContrato.contrato.contadorTicket -1), //en estado esta el numero que se va a agregar al contrato o proximo id
      });

      setNumerosGanadores(array_nulo);
      setSorteoShow(false);
      setSorteoIniciado(false);
    }
  }, [fisSuccess,winnersAddress]);

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
      inicializarSorteo(`${window.CONTRACT_ADDRESS}`);
    } else {
      console.log(`Debe iniciar sesión para inicializar un Sorteo.`);
    }
  };

  const handleFinalizoSorteo = () => {
    if (validateNumbers()) {
      console.log(`Finalizando Sorteo. Seteo numeros ganadores: [${numerosGanadores}]`);
      if (isConnected) {
        finalizarSorteo(`${window.CONTRACT_ADDRESS}`, numerosGanadores);        
      } else {
        console.log("Sin conexión.");
      }
    } else {
      console.log("Uno o más números son inválidos.");
    }
  };

  const setRandonNumbers = ()=>{
    const array_random = generateRandomNumbers(); // Generar los números aleatorios
    setNumerosGanadores(array_random);
  }

  const generateRandomNumbers = () => {
    const numbers = [];
    while (numbers.length < 6) {
      const randomNumber = Math.floor(Math.random() * 45) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      }
    }
    return numbers;
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
          isLoading={isSorteoActivo ? ( fisPending) : (iisPending)}
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
                        id= {`#${index + 1}`}
                        value={numerosGanadores[index] || ''}
                        onChange={(value) =>handleInputChange(index,value)}
                        className={` ${!validityState[index] ? 'is-invalid' : ''}`}
                        />
                  </Col>
                ))}
              </Row>
              <Row>
                  <Button onClick={setRandonNumbers}>Sortear Random</Button>
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
