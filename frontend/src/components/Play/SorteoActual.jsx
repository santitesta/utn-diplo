
import { useState, useEffect } from "react";
import {Container, Col, Row, Button } from "react-bootstrap";
import { useAccount } from 'wagmi';
import Account from '../Web3/Account';
import { Connect } from '../Web3/Connect';
import CardTicket from "../CardTicket/CardTicket";
import axios from 'axios';
import {
    useComprarTicket,
    registrarEventos
} from '../../services/contractService';

import useContractInfo from "../../hooks/useContractInfo";
//icono
function SorteoActual({ sorteoID }) {
    const { isConnected, address } = useAccount();
    const { estadoContrato, owner, pozo, currentDraw } = useContractInfo();
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
            alert('No esta conectado a su wallet')
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
                {isConnected && <Account /> }
                <hr />
                <CardTicket
                    count={6}
                    title={"Comprar un Ticket"}
                    header={"Seleccione los numeros para participar"}
                    handleButton={handleComprarTicket}
                    numeros={numeros}
                    setNumeros={setNumeros}
                    isPending={wcComprarTicket.isPending}
                    isConfirmed={wfComprarTicket.isConfirmed}
                    error={wcComprarTicket.error}
                    hash={wcComprarTicket.data}
                >
                    {isConnected ? 
                        <Button 
                            variant="primary" 
                            type="submit"  
                            disabled={(wfComprarTicket.isConfirming || wfComprarTicket.isConfirmed)?true:false}
                            >
                                Comprar Ticket
                        </Button>
                        : 
                        <Connect/> 
                    } 
                </CardTicket>
            </Col>
        </Row>
    );
}

export default SorteoActual;