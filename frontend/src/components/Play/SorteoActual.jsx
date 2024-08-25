
import { useState, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useAccount } from 'wagmi';
import Account from '../Web3/Account';
import { Connect } from '../Web3/Connect';
import CardTicket from "../CardTicket/CardTicket";
import axios from 'axios';
import {
    useComprarTicket,
    registrarEventos
} from '../../services/contractService';

function SorteoActual({ sorteoID }) {
    const { isConnected, address } = useAccount();
    const count = 6;
    const [numeros, setNumeros] = useState(Array(count).fill(null));
    const [registroID, setRegistroID] = useState(null);
    const [ticketID, setTicketID] = useState(null);
    const { comprarTicket, wcComprarTicket, wfComprarTicket } = useComprarTicket();

    const handleComprarTicket = async () => {
        registrarEventos(setTicketID, ticketID, wcComprarTicket);
        console.log(`Trata de comprar ticket con números [${numeros}]`);
        let numerosOrdenados = [...numeros].sort((a, b) => a - b);
        if (isConnected) {
            const response = await axios.post(`${window.URL_BACKEND}/registrarCompra`, {
                chosenNumbers: numerosOrdenados,
                drawId: sorteoID,
                ownerAddress: address
            });
            setRegistroID(response.data.id);
            console.log("Respuesta de la API:", response.data);
            comprarTicket(`${window.CONTRACT_ADDRESS}`, numerosOrdenados, sorteoID, registrarEventos);
        } else {
            console.log("Sin conexión.");
        }
    };

    useEffect(() => {
        const array_nulo = Array(count).fill(null);
        if (wfComprarTicket.isSuccess && ticketID && numeros !== array_nulo) {
            const estado = wfComprarTicket.isSuccess ? 'confirmada' : 'fallida';
            console.log(`tx [${registroID}]=> ticketID[${ticketID}] => [${estado}]=>hash [${wcComprarTicket.data}]`);
            alert(`Se compró ticket[${ticketID}] con números [${numeros}]. Me falta generar el historial`);
            axios.put(`${window.URL_BACKEND}/actualizarCompra/${registroID}`, {
                txHash: wcComprarTicket.data,
                estado: estado,
                ticketID: ticketID
            });
            setNumeros(array_nulo);
            setTicketID(null);
        }
    }, [wfComprarTicket, ticketID]);

    return (
        <Row>
            <Col className="d-grid gap-2">
                {isConnected ? <Account /> : <Connect />}
                <hr />
                <CardTicket
                    count={6}
                    title={"Sorteo en Curso"}
                    header={"Números Elegidos"}
                    buttonText={"Comprar Ticket"}
                    handleButton={handleComprarTicket}
                    variant="primary"
                    numeros={numeros}
                    setNumeros={setNumeros}
                    isPending={wcComprarTicket.isPending}
                    isConfirming={wfComprarTicket.isConfirming}
                    isConfirmed={wfComprarTicket.isConfirmed}
                    error={wcComprarTicket.error}
                    hash={wcComprarTicket.data}
                />
            </Col>
        </Row>
    );
}

export default SorteoActual;