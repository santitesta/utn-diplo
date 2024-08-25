
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useAccount } from 'wagmi';
import axios from 'axios';
//COMPONENTES
import Account from '../Web3/Account';
import { Connect } from '../Web3/Connect';
import CardSorteo from "../CardSorteo/CardSorteo";
import CardTicket from "../CardTicket/CardTicket";
import {
    useSetearPozos,
    useInicializarSorteo,
    useFinalizarSorteo,
} from '../../services/contractService';


function Botonera({ owner, sorteoID }) {
    const { isConnected, address } = useAccount();
    const navigate = useNavigate(); 
    const count = 6;
    const [pozoPrimario, setPozoPrimario] = useState(null);
    const [pozoSecundario, setPozoSecundario] = useState(null);
    const [reservePot, setReservePot] = useState(null);
    const [numerosGanadores, setNumerosGanadores] = useState(Array(count).fill(null));
    const [numeros, setNumeros] = useState(Array(count).fill(null));
    const [registroID, setRegistroID] = useState(null);
    const [ticketID, setTicketID] = useState(null);
    const isOwner= (address === owner)

    useEffect(() => {
        if (!isOwner) {
            // Redirigir si no es el propietario/administrador
            navigate("/play");
        }
    }, [isOwner, navigate]);

    const { setearPozos, wcSetearPozos, wfSetearPozos } = useSetearPozos();
    const { finalizarSorteo, wcFinalizarSorteo, wfFinalizarSorteo } = useFinalizarSorteo();
    const { inicializarSorteo, wcInicializarSorteo, wfInicializarSorteo} = useInicializarSorteo();

    const handleSetearPozos = (e) => {
        e.preventDefault();
        if (isConnected) {
            setearPozos(`${window.CONTRACT_ADDRESS}`, pozoPrimario, pozoSecundario, reservePot);
            console.log(`Pozo Primario[${pozoPrimario}]  Pozo Secundario[${pozoSecundario}] Pozo Reserva[${reservePot}]`);
        } else {
            console.log('Debe iniciar sesión para cambiar Pozos.');
        }
    };

    const handleIniciarSorteo = (e) => {
        e.preventDefault();
        if (isConnected) {
            inicializarSorteo(`${window.CONTRACT_ADDRESS}`);
            console.log(`Inicio de Sorteo.`);
        } else {
            console.log(`Debe iniciar sesión para inicializar un Sorteo.`);
        }
    };

    const handleFinalizoSorteo = () => {
        console.log(`Se finalizó el sorteo. Ganadores números: [${numerosGanadores}]`);
        let numerosOrdenados = [...numerosGanadores].sort((a, b) => a - b);
        if (isConnected) {
            finalizarSorteo(`${window.CONTRACT_ADDRESS}`, numerosOrdenados);
            console.log("Fin del sorteo exitoso.");
        } else {
            console.log("Sin conexión.");
        }
    };

    useEffect(() => {
        if (wfSetearPozos.isSuccess) {
            alert(`Pozo Primario[${pozoPrimario}]  Pozo Secundario[${pozoSecundario}] Pozo Reserva[${reservePot}]`);
        }
    }, [wfSetearPozos]);


    useEffect(() => {
        const array_nulo = Array(count).fill(null);
        if (wfFinalizarSorteo.isSuccess) {
            alert(`Se finalizó el sorteo. Ganadores números: [${numerosGanadores}]. Me falta generar el historial.`);
            setNumerosGanadores(array_nulo);
        }
    }, [wfFinalizarSorteo]);

    useEffect(() => {
        if (wfInicializarSorteo.isSuccess) {
            alert(`Se inicio el sorteo.`);
        }
    }, [wfInicializarSorteo]);

    return (
        
        <Row>
            <Col className="d-grid gap-2">
                {isConnected ? <Account owner={owner} /> : <Connect />}
                <hr />
                {isOwner && (
                    <>
                        <CardSorteo
                            title={"Sorteo"}
                            buttonText={"Cambiar Pozos"}
                            buttonText2={"Iniciar Sorteo"}
                            pozoPrimario={pozoPrimario}
                            pozoSec={pozoSecundario}
                            reservePot={reservePot}
                            setPozoPrimario={setPozoPrimario}
                            setPozoSec={setPozoSecundario}
                            setReservePot={setReservePot}
                            handleSubmit={handleSetearPozos}
                            handleSubmit2={handleIniciarSorteo}
                            isPending={wcSetearPozos.isPending}
                            isConfirming={wfSetearPozos.isConfirming}
                            isConfirmed={wfSetearPozos.isConfirmed}
                            error={wcSetearPozos.error}
                            hash={wcSetearPozos.data}
                        />
                        <hr />
                        <CardTicket
                            count={6}
                            title={"Sorteo"}
                            header={"Números Ganadores"}
                            buttonText={"Finalizar"}
                            handleButton={handleFinalizoSorteo}
                            variant="success"
                            numeros={numerosGanadores}
                            setNumeros={setNumerosGanadores}
                            isPending={wcFinalizarSorteo.isPending}
                            isConfirming={wfFinalizarSorteo.isConfirming}
                            isConfirmed={wfFinalizarSorteo.isConfirmed}
                            error={wcFinalizarSorteo.error}
                            hash={wcFinalizarSorteo.data}
                        />
                        <hr />
                    </>
                )}
            </Col>
        </Row>
    );
}

Botonera.propTypes = {
    owner: PropTypes.string.isRequired,
};

export default Botonera;