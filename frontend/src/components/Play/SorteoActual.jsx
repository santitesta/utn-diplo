
import { useState, useEffect } from "react";
import {Container, Col, Row, Button } from "react-bootstrap";
import { useAccount } from 'wagmi';
import Account from '../Web3/Account';
import { Connect } from '../Web3/Connect';
import CardTicket from "../CardTicket/CardTicket";
import axios from 'axios';
import {
    useComprarTicket,
    //registrarEventos
} from '../../services/contractService';
import {
    useComprarTicket as useComprarTicket2,
    //registrarEventos
} from '../../services/comprarTicketService';


import useContractInfo from "../../hooks/useContractInfo";
//icono
function SorteoActual({ sorteoID }) {
    const { isConnected, address } = useAccount();
    const { estadoContrato} = useContractInfo();
    const precio = estadoContrato?.contrato.ticketPrice;
    const count = 6;
    const [numeros, setNumeros] = useState(Array(count).fill(null));
    const [registroID, setRegistroID] = useState(null);
   // const {  wcComprarTicket, wfComprarTicket } = useComprarTicket();
    const { comprarTicket, returnedTicketID:ticketID ,isSuccess,hash ,errorMessage,isPending,isError } = useComprarTicket2();

    const handleComprarTicket = async () => {
        console.log(`Trata de comprar ticket con números [${numeros}]`);
        let numerosOrdenados = [...numeros].sort((a, b) => a - b);
        if (isConnected && precio> 0) {
            const response = await axios.post(`${window.URL_BACKEND}/registrarCompra`, {
                chosenNumbers: numerosOrdenados,
                drawId: sorteoID,
                ownerAddress: address
            });
            setRegistroID(response.data.id);
            console.log("Respuesta de la API:", response.data);
            comprarTicket(`${window.CONTRACT_ADDRESS}`, numerosOrdenados, precio);
        } else {
            console.log("Sin conexión.");
            alert('No esta conectado a su wallet')
        }
    };

    useEffect(() => {
        const array_nulo = Array(count).fill(null);
        if (isSuccess && ticketID > 0 && numeros !== array_nulo) {
            const estado = isSuccess ? 'confirmada' : 'fallida';
            console.log(`tx [${registroID}]=> ticketID[${ticketID}] => [${estado}]=>hash [${hash}]`);
            alert(`Se compró ticket[${ticketID}] con números [${numeros}]. Me falta generar el historial`);
            axios.put(`${window.URL_BACKEND}/actualizarCompra/${registroID}`, {
                txHash: hash,
                estado: estado,
                ticketID: ticketID
            });
            setNumeros(array_nulo);
        }
    }, [isSuccess, ticketID]);

    useEffect(() => {
        if(ticketID == -1)
        {
            const shortMessage= errorMessage?.shortMessage || "Unknown error";
            const array_nulo = Array(count).fill(null);
            const estado = 'fallida';
            axios.put(`${window.URL_BACKEND}/actualizarCompra/${registroID}`, {
                txHash: null,
                estado: estado,
                ticketID: null,
                errorMessage: shortMessage,
            });
            setNumeros(array_nulo);
        }
    }, [errorMessage, ticketID]);

    // useEffect(() => {

        
    //     console.log('isPending',isPending);
    //     console.log('isError',isError);
    //     console.log('isSuccess',isSuccess);

    // }, [isPending, isSuccess,isError]);
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
                    isPending={isPending}
                    isConfirmed={isSuccess}
                    error={isError?errorMessage:null}
                    hash={hash}
                >                
                    {isConnected ? 
                        <Button 
                            variant="primary" 
                            type="submit"  
                            disabled={(isPending && !isSuccess && !errorMessage)?true:false}
                            >
                                Comprar Ticket ({precio})
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